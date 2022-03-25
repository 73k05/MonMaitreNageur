import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Link,
  Button,
  Input,
  ConnectedLayout,
  RadioButton,
  ModalDialog,
  AppStatusBar,
} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../Auth';
import {colors} from '../assets/style';
import {gql} from '@apollo/client';
import updateUserConstraints from '../utils/constraints/mutations/utilisateur/updateUser';
import validate from 'validate.js';
import {useNotification, useMmnMutation} from '../hooks';
import {REFRESH_TOKEN} from '../configs/queries';
import {appVersion, deviceName, osName} from '../utils';

const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $lastname: String!
    $firstname: String!
    $civility: Int!
    $email: String!
    $birthday: String!
  ) {
    updateUser(
      id: $id
      lastname: $lastname
      firstname: $firstname
      civility: $civility
      email: $email
      birthday: $birthday
    ) {
      success
      errorCode
      message
      utilisateur {
        birthday
        civility
        email
        firstname
        lastname
        formal
        id
      }
    }
  }
`;

export const InfoPersoScreen = ({}) => {
  const notification = useNotification();
  notification.show();
  const {user, saveUser, signIn} = useAuth();
  const navigation = useNavigation();

  const [civility, setCivility] = useState(user?.civility?.toString() || '1');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [updateUser] = useMmnMutation<any>(UPDATE_USER);
  const [refreshToken] = useMmnMutation(REFRESH_TOKEN);
  const [errorForm, setErrorForm] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteUser] = useMmnMutation(gql`
    mutation deleteUser($userId: String!) {
      deleteUser(userId: $userId) {
        success
        message
        deleted
        toDeleteAfterSubscription
      }
    }
  `);

  const handleSubmit = async (dataSubmitted: any) => {
    try {
      setErrorForm(null);

      const errors = validate(dataSubmitted, updateUserConstraints, {
        fullMessages: false,
      });

      if (errors) {
        handleError(errors);
      }

      if (!errors) {
        const r: any = await updateUser(dataSubmitted);
        if (r?.updateUser?.success) {
          saveUser(r?.updateUser?.utilisateur);
          const t = await refreshToken({
            os: osName(),
            appVersion: appVersion(),
          });
          signIn(t?.refreshToken?.token);
          await notification.set({type: 'saveUser'});
        } else {
          setErrorForm(r?.updateUser?.message || "Une erreur s'est produite");
        }
      }
    } catch (err) {
      console.error(err);
      setErrorForm(err.toString());
    }
  };

  const handleError = (errors: any) => {
    setErrorForm(
      errors.lastname
        ? errors.lastname[0]
        : errors.firstname
        ? errors.firstname[0]
        : errors.email
        ? errors.email[0]
        : errors.birthday
        ? errors.birthday[0]
        : null,
    );
  };

  const handleDelete = async () => {
    try {
      const data = {
        userId: user?.id,
      };
      const r = await deleteUser(data);
      if (r?.deleteUser?.toDeleteAfterSubscription === true) {
        navigation.navigate('InfoDeleteAccount');
        setModalVisible(false);
      }
      if (r?.deleteUser?.deleted === true) {
        navigation.navigate('DeleteAccount');
        setModalVisible(false);
      }
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    if (user?.civility) {
      setCivility((user?.civility || '1').toString());
    }
    setLastname(user?.lastname || '');
    setFirstname(user?.firstname || '');
    setEmail(user?.email || '');
    setBirthday(user?.birthday || '');
  }, [user]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : ''}
      keyboardVerticalOffset={-60}
      style={styles.container}>
      <View style={{flex: 1, width: Dimensions.get('window').width}}>
        <ConnectedLayout back={true} title={'Mes infos personnelles'}>
          <AppStatusBar transparent />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.marginView}>
              {errorForm && (
                <View style={styles.errorMessageView}>
                  <Text style={styles.errorMessageText}>{errorForm}</Text>
                </View>
              )}
              <View style={[styles.item, styles.alignButton]}>
                <View style={styles.civility}>
                  <RadioButton
                    onPress={() => setCivility('2')}
                    mode={civility === '2' ? 'secondary' : 'unchecked'}
                    label="Monsieur"
                    value={'2'}
                  />
                </View>
                <View style={styles.civility}>
                  <RadioButton
                    onPress={() => setCivility('3')}
                    mode={civility === '3' ? 'primary' : 'unchecked'}
                    label="Madame"
                    value={'3'}
                  />
                </View>
                <View style={[styles.civility, {marginRight: 0}]}>
                  <RadioButton
                    onPress={() => setCivility('1')}
                    mode={civility === '1' ? 'secondaryDark' : 'unchecked'}
                    label="Autre"
                    value={'1'}
                  />
                </View>
              </View>
              <View style={styles.item}>
                <Input
                  placeholder={'Nom'}
                  onChangeText={(v: string) => setLastname(v)}
                  value={lastname}
                  noUnderline={true}
                />
              </View>
              <View style={styles.item}>
                <Input
                  onChangeText={(v: string) => setFirstname(v)}
                  placeholder={'Prénom'}
                  value={firstname}
                  noUnderline={true}
                />
              </View>
              <View style={styles.item}>
                <Input
                  onChangeText={(v: string) => setEmail(v)}
                  placeholder={'Adresse email'}
                  value={email}
                  noUnderline={true}
                  text={'récupérer adresse mail'}
                />
              </View>
              <View style={styles.item}>
                <Input
                  onChangeText={(v: string) => {
                    let newValue = v;
                    if (v.length === 2 && v.length > birthday.length) {
                      newValue = `${v}/`;
                    }
                    if (v.length === 5 && v.length > birthday.length) {
                      newValue = `${v}/`;
                    }
                    setBirthday(newValue);
                  }}
                  placeholder={'Date de naissance'}
                  value={birthday}
                  noUnderline={true}
                  maxLength={10}
                />
              </View>
              <Button
                onPress={async () => {
                  await handleSubmit({
                    id: user?.id,
                    civility: parseInt(civility, 10),
                    lastname: lastname || null,
                    firstname,
                    email,
                    birthday,
                  });
                }}
                style={styles.marginTopButton}
                color="primary"
                mode="contained">
                Enregistrer les modifications
              </Button>
              <View style={styles.deleteLinkWrapper}>
                <Link
                  style={styles.deleteLink}
                  onPress={() => setModalVisible(true)}>
                  Supprimer mon compte
                </Link>
              </View>
            </View>
          </ScrollView>

          {modalVisible && (
            <ModalDialog
              titleModal="Demande de confirmation"
              descModal="Êtes vous sûr de vouloir supprimer votre compte Mon Maître Nageur ?"
              action
              mode="2Button"
              ariaLabelDismiss="Non, merci"
              ariaLabel="Je confirme"
              visible={modalVisible}
              onPress={handleDelete}
              onClose={() => setModalVisible(false)}
            />
          )}
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
  civility: {
    flex: 1,
    marginRight: 10,
  },
  marginView: {
    marginTop: 10,
  },
  deleteLinkWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  deleteLink: {
    fontWeight: 'normal',
    fontSize: 14,
    color: colors.black80,
  },
  item: {
    paddingBottom: 10,
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
  marginTopButton: {
    marginTop: 10,
  },
  alignButton: {
    flexDirection: 'row',
  },
  w100: {
    flex: 1,
  },
  paddingRight: {
    marginRight: 5,
  },
  paddingLeft: {
    marginLeft: 5,
  },
});

export default InfoPersoScreen;
