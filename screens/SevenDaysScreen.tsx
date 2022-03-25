import React, {useEffect} from 'react';
import Device from 'react-native-device-detection';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  DefaultLayout,
  Headline,
  Text,
  LogoMmnIcon,
  AppStatusBar,
} from '../components';
import {useNavigation} from '@react-navigation/native';
import Screen from '../hocs/Screen';
import {useNotification} from '../hooks';
import * as ScreenOrientation from 'expo-screen-orientation';

export const SevenDaysScreen = Screen(() => {
  const notification = useNotification();
  notification.show();
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width / 3;
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  return (
    <DefaultLayout
      imageBackground
      src={
        Device.isTablet
          ? require('../assets/img/MMN-Ecran_PUB-7joursGratuits-Tablette.jpg')
          : require('../assets/img/MMN-Ecran_PUB-7joursGratuits-Mobile.jpg')
      }
      close
      onClose={() => navigation.navigate('Swiper')}
      colorLogo="transparent">
      <AppStatusBar />
      <View style={styles.alignView}>
        <LogoMmnIcon color="white" width={width} />
        <Headline center fontColor="white" style={styles.headlineStyle}>
          7 jours gratuits pour fêter votre inscription !
        </Headline>
        <Text style={styles.textStyle} center weight="bold">
          À l'inscription, vous bénéficierez de l’intégralité du contenu de
          chaque activité en libre accès, pendant une semaine.
        </Text>
      </View>
    </DefaultLayout>
  );
});

const styles = StyleSheet.create({
  headlineStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingTop: 20,
  },
  alignView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '90%',
  },
  textStyle: {},
});

if (Device.isTablet) {
  Object.assign(styles, {
    headlineStyle: {
      maxWidth: 250,
      paddingBottom: 30,
      paddingTop: 50,
    },
    textStyle: {
      maxWidth: 370,
    },
  });
}

export default SevenDaysScreen;
