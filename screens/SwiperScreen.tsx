import React, {useState} from 'react';
import Device from 'react-native-device-detection';
import Swiper from 'react-native-web-swiper';
import {StyleSheet, SafeAreaView, Dimensions, View} from 'react-native';
import {
  Button,
  Text,
  Headline,
  LogoMmnIcon,
  Swiper1Illustration,
  Swiper2Illustration,
  Swiper3Illustration,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import {useNavigation} from '@react-navigation/native';
import {useNotification} from '../hooks/useNotification';

export const SwiperScreen = ({...props}) => {
  const notification = useNotification();
  notification.show();
  const navigation = useNavigation();
  const widthTablet = Dimensions.get('screen').width / 1.2;
  const heightTablet = Dimensions.get('screen').height / 1.5 - 30;

  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height / 2;

  const firstPage = {backgroundColor: colors.blueD};
  const secondaryPage = {backgroundColor: colors.blueL};
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView
      style={[
        styles.container,
        currentIndex === 0 ? firstPage : secondaryPage,
      ]}>
      <AppStatusBar />
      <Swiper
        loop
        timeout={5}
        controlsProps={{
          prevPos: false,
          nextPos: false,
          dotActiveStyle: {backgroundColor: colors.pinkD},
        }}
        onIndexChanged={newIndex => setCurrentIndex(newIndex)}>
        <View style={[styles.slideContainer]}>
          <LogoMmnIcon />
          <View style={styles.contentParagraphTablet}>
            <Text
              fontColor="white"
              weight="regular"
              mode="body"
              style={[
                styles.paddingViewImg,
                styles.textCenter,
                styles.paddingView,
              ]}>
              Bienvenue sur la première application d'activité physique
              aquatique
            </Text>
          </View>
        </View>
        <View style={[styles.slideContainer]}>
          <View style={[styles.marginLessView]}>
            <Swiper1Illustration
              height={Device.isTablet ? heightTablet : height}
              width={Device.isTablet ? widthTablet : width}
            />
            <View style={[styles.paddingView, styles.contentParagraphTablet]}>
              <Headline fontColor="white" mode="h1" center>
                Mon maître nageur
              </Headline>
              <Text
                fontColor="white"
                weight="regular"
                mode="body"
                style={[styles.textCenter, styles.paddingHeadline]}>
                Tout d'abord, protégez bien votre smartphone ou tablette et
                posez le sur le bord du bassin.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slideContainer]}>
          <View style={[styles.marginLessView]}>
            <Swiper2Illustration
              height={Device.isTablet ? heightTablet : height}
              width={Device.isTablet ? widthTablet : width}
            />
            <View style={[styles.paddingView, styles.contentParagraphTablet]}>
              <Headline fontColor="white" mode="h1" center>
                Les coachs
              </Headline>
              <Text
                fontColor="white"
                weight="regular"
                mode="body"
                style={[styles.textCenter, styles.paddingHeadline]}>
                Nos coachs sont tous des professionnels diplômés d’État, des
                experts dans leurs disciplines et pour la plupart des Maîtres
                Nageurs Sauveteurs en activité.
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.slideContainer]}>
          <View style={[styles.marginLessView]}>
            <Swiper3Illustration
              height={Device.isTablet ? heightTablet : height}
              width={Device.isTablet ? widthTablet : width}
            />
            <View style={[styles.paddingView, styles.contentParagraphTablet]}>
              <Headline fontColor="white" mode="h1" center>
                Les activités
              </Headline>
              <Text
                fontColor="white"
                weight="regular"
                mode="body"
                style={[styles.textCenter, styles.paddingHeadline]}>
                Bébés nageurs, cours de natation, aquagym et bien d’autres
                disciplines encore ; quels que soient votre âge et votre forme
                physique, il y en a forcément une faite pour vous :-)
              </Text>
            </View>
          </View>
        </View>
      </Swiper>
      <View style={[styles.groupButtonView]}>
        <View>
          <Button onPress={() => navigation.navigate('SignUp')} {...props}>
            Je m’inscris
          </Button>
        </View>
        <View>
          <Button
            onPress={() => navigation.navigate('Login')}
            mode="text"
            color="white"
            {...props}>
            Je me connecte
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    height: '100%',
    width: '100%',
  },
  slideContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupButtonView: {
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 5,
  },
  paddingView: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  paddingViewImg: {
    marginTop: 50,
  },
  paddingHeadline: {
    paddingTop: 10,
  },
  marginLessView: {
    marginTop: '-30%',
  },
  textCenter: {
    textAlign: 'center',
  },
  contentParagraphTablet: {},
});

if (Device.isTablet) {
  Object.assign(styles, {
    marginLessTextView: {
      marginTop: '-10%',
    },
    marginLessView: {
      marginTop: '-10%',
    },
    contentParagraphTablet: {
      alignSelf: 'center',
      maxWidth: 500,
    },
  });
}
