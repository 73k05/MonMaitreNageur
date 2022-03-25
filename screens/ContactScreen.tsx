import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Button,
  ConnectedLayout,
  Text,
  Headline,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import {osName, deviceName, appVersion} from '../utils';
import {useNotification, useMmnMutation} from '../hooks';
import {gql} from '@apollo/client';
import Screen from '../hocs/Screen';

export const ContactScreen = Screen(({}) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [addAppComment] = useMmnMutation(gql`
    mutation AddAppComment(
      $comment: String!
      $os: String!
      $device: String!
      $appVersion: String!
    ) {
      addAppComment(
        comment: $comment
        os: $os
        device: $device
        appVersion: $appVersion
      ) {
        success
        message
      }
    }
  `);

  const notification = useNotification();
  const [notif, showNotif] = useState(false);

  useEffect(() => {
    if (notif) {
      notification.show();
    }
  }, [notification, notif]);

  const handleSubmit = async () => {
    try {
      const data = {
        comment,
        os: osName(),
        device: deviceName(),
        appVersion: appVersion(),
      };
      const r = await addAppComment(data);
      if (r?.addAppComment?.success === false) {
        setError(r?.addAppComment?.message);
      } else {
        await notification.set({
          type: 'contactMail',
          message: r?.addAppComment?.message,
        });
        showNotif(true);
        setComment('');
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : ''}
      keyboardVerticalOffset={-40}
      style={styles.container}>
      <View style={{flex: 1, width: Dimensions.get('window').width}}>
        <ConnectedLayout back={true} title={'Nous contacter'}>
          <AppStatusBar transparent />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.marginView}>
              {error.length > 0 && (
                <View style={styles.notificationErrorStyle}>
                  <Text mode="little">{error}</Text>
                </View>
              )}
              <Text fontColor="tertiary" style={styles.textStyle}>
                Pour toute question sur l’application Mon Maître Nageur, votre
                abonnement ou votre compte, n’hésitez pas à contacter notre
                équipe par mail.
              </Text>
              <Headline mode="h3" style={styles.headlineStyle}>
                Votre message
              </Headline>
              <View style={styles.item}>
                <TextInput
                  onChangeText={(v: string) => {
                    setComment(v);
                  }}
                  value={comment}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder=""
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                />
              </View>
              <Button
                onPress={handleSubmit}
                style={styles.marginTopButton}
                color="primary"
                mode="contained">
                Envoyer un email
              </Button>
            </View>
          </ScrollView>
        </ConnectedLayout>
      </View>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  root: {},
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  textStyle: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  item: {
    marginTop: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 4,
    backgroundColor: 'white',
    borderColor: colors.greyD,
  },
  marginTopButton: {
    marginTop: 24,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
  notificationErrorStyle: {
    backgroundColor: colors.pinkD,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 6,
  },
});

export default ContactScreen;
