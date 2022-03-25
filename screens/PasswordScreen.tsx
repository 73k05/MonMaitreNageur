import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';
import {AppStatusBar, ConnectedLayout, PasswordForm} from '../components';
import {useAuth} from '../Auth';
import {gql} from '@apollo/client';
import changePassword from '../utils/constraints/mutations/utilisateur/changePassword';
import {useNotification, useMmnMutation} from '../hooks';

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $id: String!
    $password: String!
    $confirmPassword: String!
    $currentPassword: String!
  ) {
    changePassword(
      id: $id
      password: $password
      confirmPassword: $confirmPassword
      currentPassword: $currentPassword
    ) {
      errorCode
      success
      message
      success
    }
  }
`;

export const PasswordScreen = ({}) => {
  const [key, setKey] = useState(1);
  const notification = useNotification();
  notification.show();
  const {user} = useAuth();
  const [changePassword] = useMmnMutation<any>(CHANGE_PASSWORD);
  const [errorForm, setErrorForm] = useState<string | null>(null);

  const handleError = (errors: any) => {
    setErrorForm(
      errors.currentPassword
        ? errors.currentPassword[0]
        : errors.password
        ? errors.password[0]
        : errors.confirmPassword
        ? errors.confirmPassword[0]
        : null,
    );
  };

  const handleSubmit = async (dataSubmitted: any) => {
    setErrorForm(null);
    try {
      const r: any = await changePassword({
        ...dataSubmitted,
        id: user?.id,
      });
      if (r?.changePassword?.success) {
        await notification.set({type: 'changePassword'});
        setKey(key + 1);
      } else {
        setErrorForm(r?.changePassword?.message || "Une erreur s'est produite");
      }
    } catch (err) {
      console.error(err);
      setErrorForm(err.toString());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : ''}
      keyboardVerticalOffset={-90}
      style={styles.container}>
      <View style={{flex: 1, width: Dimensions.get('window').width}}>
        <ConnectedLayout back={true} title={'Mon mot de passe'}>
          <AppStatusBar transparent />
          <View style={styles.marginView}>
            <PasswordForm
              key={key}
              onSubmit={handleSubmit}
              onError={handleError}
              error={errorForm}
            />
          </View>
        </ConnectedLayout>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  marginView: {
    marginTop: 10,
  },
});

export default PasswordScreen;
