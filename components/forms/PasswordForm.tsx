import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {Button, Input} from '../atoms';
import validate from 'validate.js';
import {colors} from '../../assets/style';
import changePasswordConstraints from '../../utils/constraints/mutations/utilisateur/changePassword';

export interface PasswordFormInterface {
  onSubmit?: Function;
  onError?: Function;
  error?: string | null;
}

export const PasswordForm = ({
  onSubmit = undefined,
  onError = undefined,
  error = null,
}: PasswordFormInterface) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setOldPasswordError(null);
    setNewPasswordError(null);
    setRepeatPasswordError(null);
  }, [oldPassword, newPassword, repeatPassword]);

  const handleSubmit = () => {
    const data = {
      currentPassword: oldPassword,
      password: newPassword,
      confirmPassword: repeatPassword,
    };
    const errors = validate(data, changePasswordConstraints, {
      fullMessages: false,
    });
    errors ? onError && onError(errors) : onSubmit && onSubmit(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <View style={styles.errorMessageView}>
          <Text style={styles.errorMessageText}>{error}</Text>
        </View>
      )}
      <View style={styles.item}>
        <Input
          placeholder={'Ancien mot de passe'}
          secureTextEntry={true}
          noUnderline={true}
          onChangeText={(value: string) => setOldPassword(value)}
          error={!!oldPasswordError}
        />
      </View>
      <View style={styles.item}>
        <Input
          placeholder={'Nouveau mot de passe'}
          secureTextEntry={true}
          noUnderline={true}
          onChangeText={(value: string) => setNewPassword(value)}
          error={!!newPasswordError}
        />
      </View>
      <View style={styles.item}>
        <Input
          placeholder={'Confirmer votre mot de passe'}
          secureTextEntry={true}
          noUnderline={true}
          onChangeText={(value: string) => setRepeatPassword(value)}
          error={!!repeatPasswordError}
        />
      </View>
      <Button
        style={styles.marginTopButton}
        color="primary"
        mode="contained"
        onPress={() => handleSubmit()}>
        Enregistrer les modifications
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {},
  errorMessageView: {
    color: colors.pinkD,
    paddingBottom: 30,
    paddingTop: 10,
    textAlign: 'center',
  },
  errorMessageText: {
    color: colors.pinkD,
    textAlign: 'center',
  },
  item: {
    paddingBottom: 10,
  },
  marginTopButton: {
    marginTop: 10,
  },
});

export default PasswordForm;
