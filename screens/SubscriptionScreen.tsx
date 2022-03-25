import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Linking,
  EmitterSubscription,
  Alert,
  Platform,
} from 'react-native';
import {
  ConnectedLayout,
  Headline,
  Text,
  Button,
  ButtonSubscription,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import RNIap, {
  InAppPurchase,
  requestSubscription,
  PurchaseError,
  SubscriptionPurchase,
  finishTransaction,
  purchaseErrorListener,
  purchaseUpdatedListener,
  finishTransactionIOS,
} from 'react-native-iap';

import Screen from '../hocs/Screen';
import {useAuth} from '../Auth';
import {useMmnLazyQuery, useMmnMutation} from '../hooks';
import {
  ADD_TRANSACTION,
  GET_SUBSCRIPTION,
  REFRESH_TOKEN,
} from '../configs/queries';
import {
  appVersion,
  getSubscriptionManagementLink,
  osName,
  subscriptionsIds,
} from '../utils';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

const subscriptionsDetails = Platform.select({
  ios: [
    {
      id: 'abonnementannuel8999',
      titleMonthly: 'Paiement annuel',
      price: '89,99€',
      month: '/an',
      priceMonth: 'Soit 7,50€/mois,',
      payementType: 'paiement en une fois',
      color: 'primary',
      otherPrice: 'au lieu de 139,99 €/an',
      type: 'annuel',
    },
    {
      id: 'abonnementmensuel999',
      titleMonthly: 'Paiement mensuel',
      price: '9,99€',
      month: '/mois',
      priceMonth: 'Soit 119,88 €/an,',
      payementType: 'paiement mensuel',
      color: 'secondary',
      otherPrice: 'au lieu de 14,99 €/mois',
      type: 'mensuel',
    },
  ],
  android: [
    {
      id: 'abonnementannuel',
      titleMonthly: 'Paiement annuel',
      price: '89,99€',
      month: '/an',
      priceMonth: 'Soit 7,50€/mois,',
      payementType: 'paiement en une fois',
      color: 'primary',
      otherPrice: 'au lieu de 139,99 €/an',
      type: 'annuel',
    },
    {
      id: 'abonnementmensuel',
      titleMonthly: 'Paiement mensuel',
      price: '9,99€',
      month: '/mois',
      priceMonth: 'Soit 119,88 €/an,',
      payementType: 'paiement mensuel',
      color: 'secondary',
      otherPrice: 'au lieu de 14,99 €/mois',
      type: 'mensuel',
    },
  ],
});

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;

export const SubscriptionScreen = Screen(() => {
  const [cancel, setCancel] = useState(false);
  const [freeDays, setFreeDays] = useState(false);
  const [subscriptionProcessing, setSubscriptionProcessing] = useState(false);
  const [subscriptionCancelled, setSubscriptionCancelled] = useState(false);
  const [noActiveBilledSubscription, setNoActiveBilledSubscription] =
    useState(true);
  const [addTransaction] = useMmnMutation(ADD_TRANSACTION);
  const [refreshToken] = useMmnMutation(REFRESH_TOKEN);
  const [getSubscriptionData, {error, loading, data}] = useMmnLazyQuery(
    GET_SUBSCRIPTION,
    {
      fetchPolicy: 'no-cache',
    },
  );
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const navigation = useNavigation();
  const {signIn, userToken} = useAuth();

  useEffect(() => {
    getSubscriptionData();
    return navigation.addListener('focus', async () => {
      getSubscriptionData();
    });
  }, [navigation, getSubscriptionData]);

  useEffect(() => {
    setCancel(
      data?.me?.subscription?.active === true &&
        !data?.me?.subscription?.isCancelled &&
        (data?.me?.subscription?.type === 'yearly' ||
          data?.me?.subscription?.type === 'monthly'),
    );
    setFreeDays(data?.me?.subscription?.type === 'freeTrial');
    setSubscriptionCancelled(
      data?.me?.subscription?.active === true &&
        data?.me?.subscription?.isCancelled,
    );
    setNoActiveBilledSubscription(
      !data?.me?.subscription?.active ||
        data?.me?.subscription?.type === 'freeTrial',
    );
    if (data?.me?.subscription?.type === 'yearly') {
      setSubscriptionDetails(subscriptionsDetails[0]);
    } else if (data?.me?.subscription?.type === 'monthly') {
      setSubscriptionDetails(subscriptionsDetails[1]);
    }
  }, [data]);

  const getProducts = useCallback(async (): Promise<void> => {
    try {
      await RNIap.clearProductsIOS();
      await RNIap.clearTransactionIOS();
      await RNIap.initConnection();
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        setSubscriptionProcessing(true);
        const receipt = purchase.transactionReceipt;
        if (purchase && purchase.transactionId && receipt) {
          try {
            if (osName() === 'ios') {
              await finishTransactionIOS(purchase.transactionId);
              await finishTransaction(purchase, true);
            } else if (osName() === 'android') {
              // If consumable (can be purchased again)
              // await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
              // // If not consumable
              await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
              await finishTransaction(purchase, false);
            }

            const data = {
              os: osName(),
              type: 'subscription',
              productId: purchase.productId,
              transactionDate: purchase.transactionDate.toString(),
              transactionId:
                osName() === 'ios'
                  ? purchase.originalTransactionIdentifierIOS
                  : purchase.transactionId,
              transactionReceipt:
                osName() === 'ios'
                  ? purchase.transactionReceipt
                  : purchase.purchaseToken,
            };
            await addTransaction(data);
            const newToken = await refreshToken({
              os: osName(),
              appVersion: appVersion(),
            });
            await signIn(newToken?.refreshToken?.token);
            await getSubscriptionData();
            setSubscriptionProcessing(false);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
            setSubscriptionProcessing(false);
          }
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        if (error?.code !== 'E_USER_CANCELLED') {
          Alert.alert(
            "Erreur lors de l'achat",
            "Le processus d'achat a été annulé.",
          );
        }
      },
    );

    const subscriptions = await RNIap.getSubscriptions(subscriptionsIds);
    subscriptions.forEach(subscription => {
      subscription.type = 'subs';
    });
  }, [addTransaction, getSubscriptionData, refreshToken, signIn]);

  useEffect(() => {
    getProducts();

    return (): void => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
      }
    };
  }, [getProducts]);

  if (loading || subscriptionProcessing) {
    return <LoadingScreen />;
  }

  return (
    <ConnectedLayout title={'Mon abonnement'} back={true}>
      <AppStatusBar transparent />
      <ScrollView
        horizontal={false}
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          {subscriptionCancelled && (
            <>
              <Headline mode="h3" style={styles.headlineStyle}>
                Abonnement {subscriptionDetails.type} résilié
              </Headline>
              <Text
                fontColor="tertiary"
                style={styles.textStyle}
                mode="body"
                weight="light">
                La résiliation interviendra à la date d’anniversaire de
                renouvellement : {data?.me?.subscription?.endsAt}.{'\n'}
                Passé cette date, vous pourrez vous réabonner ou supprimer votre
                compte.
              </Text>
            </>
          )}
          {cancel && (
            <>
              <Headline mode="h3" style={styles.headlineStyle}>
                Abonnement {subscriptionDetails.type} en cours
              </Headline>

              <Text
                fontColor="tertiary"
                style={styles.textStyle}
                mode="body"
                weight="light">
                Ton abonnement {subscriptionDetails.type} de{' '}
                {subscriptionDetails.price} euros, est valable jusqu’au{' '}
                {data?.me?.subscription?.endsAt}.
              </Text>
              <Button
                mode="outlined"
                style={styles.buttonMargin}
                onPress={() =>
                  Linking.openURL(
                    getSubscriptionManagementLink(data?.me?.subscription),
                  )
                }>
                Résilier mon abonnement
              </Button>
              <Text
                fontColor="tertiary"
                style={styles.textStyle}
                mode="body"
                weight="light">
                La résiliation interviendra à la date d’anniversaire de
                renouvellement.
              </Text>
            </>
          )}
          {noActiveBilledSubscription && (
            <>
              {freeDays && (
                <View style={styles.notificationStyle}>
                  <Text center fontColor="white" mode="bodyCm">
                    7 jours gratuits pour fêter votre inscription !
                  </Text>
                  <Text center style={styles.textStyle} mode="small">
                    Vous bénéficiez de l’intégralité du contenu de chaque
                    activité en libre accès, pendant une semaine jusqu’au{' '}
                    {data?.me?.subscription?.endsAt}
                  </Text>
                </View>
              )}

              <Headline mode="h3" style={styles.headlineStyle}>
                Profitez de nos offres de lancement Spécial été 2021 !
              </Headline>

              <FlatList
                horizontal={true}
                contentContainerStyle={styles.containerFlatListStyle}
                data={subscriptionsDetails}
                renderItem={({item}) => (
                  <View style={styles.flatListStyle}>
                    <ButtonSubscription
                      onPress={async () => {
                        await requestSubscription(item.id);
                      }}
                      style={{}}
                      color={item.color}
                      titleMonthly={item.titleMonthly}
                      price={item.price}
                      month={item.month}
                      priceMonth={item.priceMonth}
                      payementType={item.payementType}
                      otherPrice={item.otherPrice}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />

              <Text
                fontColor="tertiary"
                style={styles.textStyle}
                mode="body"
                weight="light">
                Renouvellement automatique à date d’anniversaire.
              </Text>

              <Headline mode="h3" style={styles.headlineStyle}>
                Les avantages :
              </Headline>

              <Text
                style={styles.textStyle}
                fontColor="tertiary"
                mode="body"
                weight="light">
                - Essai gratuit 7 jours sans engagement{'\n'}- Accès à TOUS les
                cours, stages, packs actuels et à venir{'\n'}- Accès aux futures
                vidéos, programmes et challenges EXCLUSIFS{'\n'}- Gardez ce
                tarif préférentiel tant que vous restez abonné(e){'\n'}-
                Possibilité de résilier l’abonnement à tout moment{'\n'}
              </Text>
              <Text fontColor="tertiary" mode="body" weight="body">
                - Spécial abonnement annuel : 3 mois gratuits par rapport
                l’abonnement mensuel
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  textStyle: {
    marginTop: 8,
  },
  notificationStyle: {
    backgroundColor: colors.notification,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 6,
  },
  headlineStyle: {
    marginTop: 20,
  },
  flatListStyle: {
    flex: 1,
    // flexDirection: 'column',
    marginRight: 5,
    marginLeft: 5,
  },
  buttonMargin: {
    marginTop: 30,
    marginBottom: 10,
  },
});

export default SubscriptionScreen;
