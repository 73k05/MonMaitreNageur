import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppStatusBar,
  Button,
  ConnectedLayout,
  ItemBubble,
  Writing,
} from '../components';
import {differenceInYears, parse} from 'date-fns';
import Screen from '../hocs/Screen';
import {useNavigation} from '@react-navigation/native';
import validate from 'validate.js';
import {birthdayConstraints, firstnameConstraints} from '../configs';
import {gql} from '@apollo/client';
import {useAuth} from '../Auth';
import {useNotification, useMmnMutation} from '../hooks';
/**
 * Questions normalement envoyées par l'API
 */
const questions = {
  formal: {
    id: 'formal',
    position: 'right',
    title:
      'On se tutoie ou on se vouvoie ?\nOn a l’habitude de tutoyer mais\nc’est vous qui décidez ;)',
    color: 'secondaryDark',
    type: 'choice',
    values: [
      {
        value: false,
        label: 'On se tutoie',
      },
      {
        value: true,
        label: 'On se vouvoie',
      },
    ],
  },
  civility: {
    id: 'civility',
    position: 'right',
    title: 'Dois-je t’appeler Madame,\nMonsieur ou autrement ?',
    altTitle: 'Dois-je vous appeler Madame,\nMonsieur ou autrement ?',
    color: 'secondaryDark',
    type: 'choice',
    values: [
      {
        value: 3,
        label: 'Madame',
      },
      {
        value: 2,
        label: 'Monsieur',
      },
      {
        value: 1,
        label: 'Autre',
      },
    ],
  },
  firstname: {
    id: 'firstname',
    position: 'right',
    title: 'Super, quel est ton prénom ?',
    altTitle: 'Super, quel est votre prénom ?',
    color: 'secondaryDark',
    type: 'text',
  },
  birthday: {
    id: 'birthday',
    position: 'right',
    title: ', peux-tu me\ndonner ta date de naissance ?\n(JJ/MM/AAAA)',
    altTitle: ', pouvez-vous me donner votre date de naissance ?\n(JJ/MM/AAAA)',
    color: 'secondaryDark',
    type: 'text',
  },
};

const ONBOARDING = gql`
  mutation EndOnboarding(
    $id: String!
    $formal: Boolean!
    $civility: Int!
    $firstname: String!
    $birthday: String!
  ) {
    endOnboarding(
      id: $id
      formal: $formal
      civility: $civility
      firstname: $firstname
      birthday: $birthday
    ) {
      success
      errorCode
      message
      utilisateur {
        firstname
        formal
        birthday
        civility
        id
        email
      }
    }
  }
`;

export const ChatBotScreen = Screen(() => {
  const navigation = useNavigation();
  const notification = useNotification();
  const {saveUser, user} = useAuth();
  const [endOnboarding] = useMmnMutation<any>(ONBOARDING);
  const timeout = 1000;

  const [data, setData] = useState({
    formal: null,
    civility: null,
    firstname: null,
    birthday: null,
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [writing, setWriting] = useState<boolean>(false);
  const [go, setGo] = useState(false);
  const [welcome, setWelcome] = useState<boolean>(false);
  const [writingType, setWritingType] = useState('default');
  const [writingFormat, setWritingFormat] = useState('default');

  const [formalQuestion, setFormalQuestion] = useState<boolean>(false);
  const [formalSelected, setFormalSelected] = useState<null | boolean>(null);
  const [civilityQuestion, setCivilityQuestion] = useState<boolean>(false);
  const [firstnameQuestion, setFirstnameQuestion] = useState<boolean>(false);
  const [birthdayQuestion, setBirthdayQuestion] = useState<boolean>(false);
  const [birthdaySelected, setBirthdaySelected] = useState<boolean>(false);
  const [profileReady, setProfileReady] = useState<boolean>(false);
  const [firstnameError, setFirstnameError] = useState(null);
  const [birthdayError, setBirthdayError] = useState(null);
  const [isAdult, setIsAdult] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWelcome(true);
    }, timeout);
  }, []);

  useEffect(() => {
    if (welcome) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setFormalQuestion(true);
        }, timeout);
      }, timeout * 1.5);
    }
  }, [welcome]);

  useEffect(() => {
    if (data.formal !== null) {
      if (!civilityQuestion) {
        setLoading(true);
        setTimeout(() => {
          setFormalSelected(true);
        }, timeout);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.formal]);

  useEffect(() => {
    if (formalSelected !== null) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setCivilityQuestion(true);
        }, timeout);
      }, timeout);
    }
  }, [formalSelected]);

  useEffect(() => {
    if (civilityQuestion) {
      setLoading(false);
    }
  }, [civilityQuestion]);

  useEffect(() => {
    if (data.civility !== null) {
      if (!firstnameQuestion) {
        setLoading(true);
        setTimeout(() => {
          setFirstnameQuestion(true);
        }, timeout);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.civility]);

  useEffect(() => {
    if (firstnameQuestion) {
      setLoading(false);
      setWriting(true);
    } else {
      setWriting(false);
    }
  }, [firstnameQuestion]);

  useEffect(() => {
    if (data.firstname !== null) {
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setBirthdayQuestion(true);
        }, timeout);
      }, timeout);
    }
  }, [data.firstname]);

  useEffect(() => {
    if (birthdayQuestion) {
      setLoading(false);
    }
  }, [birthdayQuestion]);

  useEffect(() => {
    if (data.birthday !== null) {
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setBirthdaySelected(true);
        }, timeout);
      }, timeout);
    }
  }, [data.birthday]);

  useEffect(() => {
    if (birthdaySelected) {
      setLoading(false);
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setProfileReady(true);
        }, timeout);
      }, timeout);
    }
  }, [birthdaySelected]);

  useEffect(() => {
    if (profileReady) {
      setLoading(false);
      setGo(true);
    }
  }, [profileReady]);

  const handleClickWriting = (value: string) => {
    if (firstnameQuestion && !birthdayQuestion) {
      setWritingType('default');
      setFirstnameError(null);
      const firstnameErrors = validate(
        {firstname: value},
        {firstname: firstnameConstraints},
        {fullMessages: false},
      );
      if (!firstnameErrors) {
        setWritingType('number-pad');
        setWritingFormat('birthday');
        setData((d: any) => ({...d, firstname: value}));
      } else {
        setFirstnameError(firstnameErrors.firstname[0]);
      }
    } else if (birthdayQuestion) {
      setBirthdayError(null);
      const birthdayErrors = validate(
        {birthday: value},
        {birthday: birthdayConstraints},
        {fullMessages: false},
      );
      if (!birthdayErrors) {
        setData((d: any) => ({...d, birthday: value}));
        const birthdayDate = parse(value, 'dd/MM/yyyy', new Date());
        const dif = differenceInYears(new Date(), birthdayDate);
        setIsAdult(dif >= 18);
        setWriting(false);
      } else {
        setBirthdayError(birthdayErrors.birthday[0]);
      }
    }
  };

  const handleGo = async () => {
    try {
      const r: any = await endOnboarding({
        id: user?.id,
        ...data,
      });
      if (r?.endOnboarding?.success) {
        const u = r?.endOnboarding?.utilisateur;
        saveUser(u);
        await notification.set({
          type: 'welcome',
          formal: u?.formal,
          civility: u?.civility,
          firstname: u?.firstname,
        });
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      } else {
        if (
          r?.endOnboarding?.message ===
          "L'utilisateur a déjà terminé l'onboarding."
        ) {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        }
        console.error(r?.endOnboarding?.message);
      }
    } catch (err) {
      console.error(err.toString(), user, {
        id: user?.id,
        ...data,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
      style={styles.container}>
      <ConnectedLayout>
        <AppStatusBar transparent />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {welcome && (
            <ItemBubble mode={'right'}>
              Hey ! Maintenant que l’on fait partie{'\n'}
              de la même équipe, il est temps{'\n'}
              de faire un peu connaissance ! :)
            </ItemBubble>
          )}

          {formalQuestion && (
            <Question
              onClick={(r: any) => setData(d => ({...d, formal: r?.value}))}
              question={questions.formal}
              data={data.formal}
            />
          )}

          {formalSelected && (
            <ItemBubble mode={'right'} color={'secondaryDark'}>
              {data.formal === false ? (
                <>
                  Top ! C'est tellement plus{'\n'}
                  sympa comme ça, tu vas voir.
                </>
              ) : (
                <>
                  Merci pour votre réponse, on{'\n'}
                  respecte votre choix !
                </>
              )}
            </ItemBubble>
          )}

          {civilityQuestion && (
            <Question
              onClick={(r: any) => setData(d => ({...d, civility: r?.value}))}
              question={questions.civility}
              formal={data.formal}
              data={data.civility}
            />
          )}

          {firstnameQuestion && (
            <Question question={questions.firstname} formal={data.formal} />
          )}

          {firstnameError && (
            <ItemBubble
              mode={'right'}
              color={'tertiary'}
              style={{marginTop: 0}}>
              {firstnameError}
            </ItemBubble>
          )}

          {data.firstname && (
            <ItemBubble mode={'right'} color={'white'} style={{marginTop: 0}}>
              {data.firstname}
            </ItemBubble>
          )}

          {birthdayQuestion && (
            <Question
              question={questions.birthday}
              formal={data.formal}
              firstname={data.firstname}
            />
          )}

          {birthdayError && (
            <ItemBubble
              mode={'right'}
              color={'tertiary'}
              style={{marginTop: 0}}>
              {birthdayError}
            </ItemBubble>
          )}

          {data.birthday && (
            <ItemBubble mode={'right'} color={'white'} style={{marginTop: 0}}>
              {data.birthday}
            </ItemBubble>
          )}

          {birthdaySelected && !isAdult && (
            <ItemBubble mode={'right'}>
              Attention, les activités doivent{'\n'}
              impérativement se faire avec la {'\n'}présence d’un adulte.
            </ItemBubble>
          )}

          {birthdaySelected && (
            <ItemBubble mode={'right'} color={'secondaryDark'}>
              Merci pour l'info ! On adore{'\n'}
              souhaiter les anniversaires.
            </ItemBubble>
          )}

          {profileReady && (
            <ItemBubble mode={'right'} color={'secondaryDark'}>
              {data.formal === false ? (
                <>
                  Ton profil est prêt ! C’est le{'\n'}
                  moment de sauter dans le grand{'\n'}
                  bain et de découvrir les activités !
                </>
              ) : (
                <>
                  Votre profil est prêt ! C’est le{'\n'}
                  moment de sauter dans le grand bain{'\n'}
                  et de découvrir les activités !
                </>
              )}
            </ItemBubble>
          )}

          {loading && <ItemBubble color={'secondary'} mode={'right'} typeIn />}
        </ScrollView>
        <View style={[styles.marginView]}>
          {writing && (
            <Writing
              format={writingFormat}
              type={writingType}
              onClick={handleClickWriting}
            />
          )}
          {go && <Button onPress={handleGo}>C'est parti !</Button>}
        </View>
      </ConnectedLayout>
    </KeyboardAvoidingView>
  );
});

export const Question = ({question, onClick, data, formal, firstname}: any) => {
  return (
    <>
      <ItemBubble mode={question.position} color={question.color}>
        {firstname && firstname}
        {formal && formal === true ? question.altTitle : question.title}
      </ItemBubble>

      {question.type === 'choice' && (
        <View style={styles.itemButtons}>
          {question.values.map((reponse: any) => (
            <Button
              key={`${question.id}-${reponse.value}`}
              onPress={() => onClick(reponse)}
              style={{marginLeft: 10}}
              mode={'bubble'}
              color={data === reponse.value ? 'primary' : 'tertiary'}>
              {reponse.label}
            </Button>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marginView: {
    marginTop: 14,
    marginBottom: 10,
  },
  itemButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  alignEnd: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default ChatBotScreen;
