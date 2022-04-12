import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppStatusBar,
  DefaultLayout,
  Link,
  SignUpUtilisateurForm,
} from '../components';
import {gql, useMutation} from '@apollo/client';
import Screen from '../hocs/Screen';
import {useNavigation} from '@react-navigation/native';
import Device from 'react-native-device-detection';
import {LOGIN} from './LoginScreen';
import {appVersion, osName} from '../utils';
import {useAuth} from '../Auth';

const SIGNUP_UTILISATEUR = gql`
  mutation SignupUtilisateur($email: String!, $motDePasse: String!) {
    signupUtilisateur(email: $email, motDePasse: $motDePasse) {
      success
      errorCode
      message
      utilisateur {
        id
      }
    }
  }
`;

export const SignUpScreen = Screen(() => {
  const navigation = useNavigation();
  const [signupUtilisateur, {loading}] = useMutation<any>(SIGNUP_UTILISATEUR);
  const [attemptLogin] = useMutation<any>(LOGIN);
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const {signIn} = useAuth();

  const handleError = (errors: any) => {
    setErrorForm(
      errors.terms
        ? errors.terms[0]
        : errors.email
        ? errors.email[0]
        : errors.motDePasse
        ? errors.motDePasse[0]
        : null,
    );
  };

  const handleSubmit = async (dataSubmitted: any) => {
    setErrorForm(null);
    try {
      const r: any = await signupUtilisateur({
        variables: dataSubmitted,
        fetchPolicy: 'no-cache',
      });
      if (r?.data?.signupUtilisateur?.success) {
        // navigation.reset({index: 0, routes: [{name: 'Welcome'}]});
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
            setErrorForm(
              r?.data?.login?.message || "Une erreur s'est produite",
            );
          }
        } catch (err) {
          console.error(err);
          setErrorForm(err.toString());
        }
      } else {
        setErrorForm(
          r?.data?.signupUtilisateur?.message || "Une erreur s'est produite",
        );
      }
    } catch (err) {
      console.error(err);
      setErrorForm(err.toString());
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? Device.isTablet
              ? 'padding'
              : 'position'
            : ''
        }
        keyboardVerticalOffset={-90}
        style={Device.isTablet ? styles.containerTablet : styles.container}>
        <DefaultLayout
          back={Device.isTablet ? false : true}
          backScreen={'Swiper'}
          styleBack={{paddingRight: 40, paddingBottom: 40}}>
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
            <SignUpUtilisateurForm
              passwordLabel="Mot de passe"
              headline="Je m’inscris"
              loading={loading}
              onSubmit={handleSubmit}
              onError={handleError}
              error={errorForm}
              generalCondition // gérer les erreurs pour ne pas valider si rien coché
              submitLabel={'Valider mon inscription'}
              patternMdp
            />
            <View style={styles.alignLink}>
              <Link
                underline
                mode={'default'}
                onPress={() =>
                  navigation.reset({index: 0, routes: [{name: 'Login'}]})
                }>
                Vous avez déjà un compte ? Me connecter
              </Link>
            </View>
          </View>
        </DefaultLayout>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

export default SignUpScreen;
