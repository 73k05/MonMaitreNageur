import React from 'react';
import Device from 'react-native-device-detection';
import {Dimensions, StyleSheet, View, ScrollView} from 'react-native';
import {
  Button,
  DefaultLayout,
  Headline,
  Text,
  WelcomeIllustration,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import {useNavigation} from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height / 2;

  const widthTablet = Dimensions.get('screen').width / 1.2;
  const heightTablet = Dimensions.get('screen').height / 1.5 - 30;

  return (
    <DefaultLayout bg={colors.blueL}>
      <AppStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={{marginTop: -30}}>
          <WelcomeIllustration
            height={Device.isTablet ? heightTablet : height}
            width={Device.isTablet ? widthTablet : width}
          />
        </View>
        <Headline center fontColor={'white'}>
          Bienvenue
        </Headline>
        <Text style={styles.textStyle}>
          Un email de confirmation vient de {'\n'}vous être envoyé. Pour
          finaliser votre {'\n'}inscription, cliquez sur le lien du mail que{' '}
          {'\n'}vous venez de recevoir. {'\n'}
          {'\n'}Puis cliquez sur le bouton ci-dessous.
        </Text>
        <View style={{maxWidth: 200, alignSelf: 'center', marginTop: 20}}>
          <Button
            size={'small'}
            mode={'contained'}
            color={'primary'}
            onPress={() =>
              navigation.reset({index: 0, routes: [{name: 'Login'}]})
            }>
            Se connecter
          </Button>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    paddingTop: 4,
  },
  marginButton: {
    marginTop: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    textStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      maxWidth: 500,
    },
  });
}

export default WelcomeScreen;
