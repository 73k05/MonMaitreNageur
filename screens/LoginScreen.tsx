import React, {useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Device from 'react-native-device-detection';
import {
  DefaultLayout,
  Text,
  Link,
  LoginForm,
  AppStatusBar,
} from '../components';
import {gql, useMutation} from '@apollo/client';
import Screen from '../hocs/Screen';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../Auth';
import {appVersion, osName} from '../utils';
import {useNotification} from '../hooks/useNotification';

const LOGIN = gql`
  mutation Login(
    $email: String!
    $motDePasse: String!
    $appVersion: String!
    $os: String!
  ) {
    login(
      email: $email
      motDePasse: $motDePasse
      os: $os
      appVersion: $appVersion
    ) {
      success
      errorCode
      message
      token
    }
  }
`;

export const LoginScreen = Screen(() => {
  const notification = useNotification();
  notification.show();
  const navigation = useNavigation();
  const {signIn} = useAuth();
  const [attemptLogin, {loading}] = useMutation<any>(LOGIN);
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleError = (errors: any) => {
    setErrorForm(
      errors.email
        ? errors.email[0]
        : errors.motDePasse
        ? errors.motDePasse[0]
        : null,
    );
  };

  const handleSubmit = useCallback(
    async (dataSubmitted: any) => {
      setErrorForm(null);
      try {
        const r: any = await attemptLogin({
          variables: {
            ...dataSubmitted,
            os: osName(),
            appVersion: appVersion(),
          },
          fetchPolicy: 'no-cache',
        });

        if (r?.data?.login?.success) {
          const token = r?.data?.login?.token;
          signIn(token);
        } else {
          setErrorForm(r?.data?.login?.message || "Une erreur s'est produite");
        }
      } catch (err) {
        console.error(err);
        setErrorForm(err.toString());
      }
    },
    [attemptLogin, signIn],
  );

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === 'ios' ? (Device.isTablet ? 'padding' : 'position') : ''
      }
      keyboardVerticalOffset={-90}
      style={Device.isTablet ? styles.containerTablet : styles.container}>
      <DefaultLayout
        back={Device.isTablet ? false : true}
        backScreen={'Swiper'}
        styleBack={{paddingRight: 40}}>
        <AppStatusBar transparent />
        <View
          style={[
            Device.isTablet
              ? styles.dimensionsViewTablet
              : styles.dimensionsView,
            styles.alignCenter,
            styles.relativeView,
            styles.marginLess,
          ]}>
          <LoginForm
            headline="Je me connecte"
            loading={loading}
            onSubmit={handleSubmit}
            onError={handleError}
            error={errorForm}
            forgotten={true}
            submitLabel={'Connexion'}
          />
          <View style={styles.alignLink}>
            <Link
              underline
              mode={'default'}
              onPress={() =>
                navigation.reset({index: 0, routes: [{name: 'SignUp'}]})
              }>
              Vous n'avez pas de compte ? M’inscrire
            </Link>
          </View>
        </View>
      </DefaultLayout>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  containerTablet: {
    flex: 1,
    //alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dimensionsView: {
    flex: 1,
    width: Dimensions.get('window').width - 25,
  },
  dimensionsViewTablet: {
    flex: 1,
    width: '100%',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  centerView: {
    alignItems: 'center',
  },
  relativeView: {
    position: 'relative',
  },
  marginLess: {
    marginTop: '-12%',
  },
  alignLink: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
});

export default LoginScreen;
