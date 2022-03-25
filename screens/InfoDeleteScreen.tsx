import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {palettes} from '../assets/style';

import Screen from '../hocs/Screen';

import {
  ConnectedLayout,
  Text,
  SadIllustration,
  Headline,
  Button,
  AppStatusBar,
} from '../components';
import {useNavigation} from '@react-navigation/native';

export const InfoDeleteScreen = Screen(() => {
  const navigation = useNavigation();

  return (
    <ConnectedLayout tabs={true} bg={palettes.secondary.bg}>
      <AppStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.alignView}>
          <SadIllustration />
        </View>
        <View>
          <Headline center mode="h2" fontColor="white">
            C’est votre choix,{'\n'}mais nous sommes tristes{'\n'}d’en rester là
            !
          </Headline>
          <Text center style={styles.textStyle} mode="small">
            {'\n'}
            Votre résiliation prendra effet à la date d’anniversaire de votre
            abonnement.{'\n'} Si vous souhaitez résilier votre abonnement
            rendez-vous dans 'Mon abonnement'.
            {'\n'}
            {'\n'}
            D'ici là, profitez bien de vos activités aquatiques.
            {'\n'}
            Toute l'équipe espère vous revoir prochainement !
          </Text>
        </View>
        <View style={styles.contentButton}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Account')}>
            J’ai compris
          </Button>
        </View>
      </ScrollView>
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  alignView: {
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 8,
  },
  contentButton: {
    paddingTop: 30,
    paddingBottom: 20,
  },
});

export default InfoDeleteScreen;
