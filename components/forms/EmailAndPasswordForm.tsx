// @ts-ignore
import {FORGOTTEN_PASSWORD_LINK} from 'react-native-dotenv';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import CheckBox from 'expo-checkbox';
import {Link, Button, Input, Headline, Text} from '../../components';
import {colors} from '../../assets/style';
import validate from 'validate.js';

export interface EmailAndPasswordInterface {
  onSubmit?: Function;
  onError?: Function;
  loading?: boolean;
  headline?: string;
  error?: string | null;
  forgotten?: boolean;
  submitLabel: string;
  passwordLabel: string;
  generalCondition?: boolean;
  patternMdp?: boolean;
}

export const EmailAndPasswordForm = ({
  onSubmit = undefined,
  onError = undefined,
  loading = false,
  headline = '',
  error = null,
  forgotten = false,
  generalCondition = false,
  submitLabel = '',
  passwordLabel = '',
  patternMdp = false,
}: EmailAndPasswordInterface) => {
  const [email, setEmail] = useState<string>('');
  const [motDePasse, setMotDePasse] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [motDePasseError, setMotDePasseError] = useState<string | null>(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    setEmailError(null);
    setMotDePasseError(null);
  }, [email, motDePasse]);

  const handleForgotten = useCallback(async () => {
    await Linking.openURL(FORGOTTEN_PASSWORD_LINK);
  }, []);

  const constraints = {
    email: {
      presence: {
        allowEmpty: false,
        message: 'Saisissez votre adresse email',
      },
      email: {
        message: 'Saisissez une adresse email valide',
      },
    },
    motDePasse: {
      presence: {
        allowEmpty: false,
        message:
          'Le mot de passe doit comporter au moins 6 caractères dont une majuscule, une minuscule et un nombre',
      },
      length: {
        minimum: 6,
        tooShort: 'Le mot de passe doit comporter au moins 6 caractères',
      },
      format: {
        pattern: '(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).*',
        message:
          'Le mot de passe doit comporter au moins une majuscule, un minuscule, un nombre et comporter au moins 6 caractères',
        flags: 'ug',
      },
    },
  };

  const handleSubmit = () => {
    if (generalCondition && !toggleCheckBox && onError) {
      onError({
        terms: ['Vous devez accepter les conditions générales pour continuer'],
      });
      return;
    }
    const data = {email, motDePasse};
    const errors = validate(data, constraints, {fullMessages: false});
    errors ? onError && onError(errors) : onSubmit && onSubmit(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Headline style={styles.marginView} center>
          {headline}
        </Headline>
        {error && (
          <View style={styles.errorMessageView}>
            <Text
              fontColor="primary"
              mode="little"
              style={styles.errorMessageText}>
              {error}
            </Text>
          </View>
        )}
        <Input
          autoCapitalize={'none'}
          spellCheck={false}
          autoCompleteType={'email'}
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder={'Email'}
          textContentType={'username'}
          noUnderline={true}
          value={email}
          onChangeText={(value: string): void => setEmail(value)}
          error={!!emailError}
        />
      </View>
      <View style={styles.item}>
        <Input
          placeholder={passwordLabel}
          secureTextEntry={true}
          autoCompleteType={'password'}
          noUnderline={true}
          value={motDePasse}
          onChangeText={(value: string) => setMotDePasse(value)}
          error={!!motDePasseError}
        />
        {patternMdp && (
          <View style={{marginTop: 6, marginLeft: 8}}>
            <Text
              fontColor="tertiary"
              mode="little"
              style={{fontStyle: 'italic'}}>
              Votre mot de passe doit comporter au moins 6 caractères dont une
              majuscule, une minuscule et un nombre.
            </Text>
          </View>
        )}
      </View>
      {forgotten && (
        <View style={styles.viewLink}>
          <Link mode="bold" style={styles.alignRight} onPress={handleForgotten}>
            Mot de passe oublié ?
          </Link>
        </View>
      )}
      {generalCondition && (
        <View style={styles.containerCheckBox}>
          <CheckBox
            style={styles.checkboxStyle}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            color={toggleCheckBox ? colors.pinkD : colors.blueD}
          />
          <Link
            underline
            mode="bold"
            onPress={() => {
              Linking.openURL(
                'https://monmaitrenageur.io/docs/conditions-generales-utilisation.pdf',
              );
              setToggleCheckBox(true);
            }}>
            J'ai pris connaissance des conditions générales d'utilisation
          </Link>
        </View>
      )}
      <Button
        style={styles.itemMargin}
        color={'primary'}
        mode={'contained'}
        disabled={loading}
        onPress={() => handleSubmit()}>
        {submitLabel}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {},
  errorMessageView: {
    paddingBottom: 30,
    textAlign: 'center',
  },
  errorMessageText: {
    color: colors.pinkD,
    textAlign: 'center',
  },
  item: {
    paddingBottom: 10,
  },
  itemMargin: {
    marginTop: 10,
  },
  viewLink: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  alignLink: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center',
  },
  marginView: {
    marginBottom: 30,
  },
  containerCheckBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 8,
    width: Dimensions.get('screen').width - 52,
  },
  checkboxStyle: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 2,
  },
});

export default EmailAndPasswordForm;
