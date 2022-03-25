import Device from 'react-native-device-detection';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {
  ChipSession,
  InfoSession,
  InfoMuscle,
  Headline,
  ListItemExercice,
  Button,
  LowIntensityIcon,
  MediumIntensityIcon,
  HardIntensityIcon,
  InfoEquipment,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import Screen from '../hocs/Screen';
import {useNavigation, useRoute} from '@react-navigation/native';
import {sessionIntensity} from '../utils/trad';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useMmnLazyQuery, useRouting, useStartSession} from '../hooks';
import {SESSION} from '../configs/queries';
import LoadingScreen from './LoadingScreen';
import {softAquagym} from '../utils/activity';

export const SeanceScreen = Screen(() => {
  const [infoMusclelVisible, setInfoMusclelVisible] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const {
    goExercise,
    goPrerequisites,
    goCountdown /*,
    goSubscription*/,
  } = useRouting();
  const {id}: any = route.params;
  const [getSession, {loading, data}] = useMmnLazyQuery(SESSION(id), {
    fetchPolicy: 'no-cache',
  });
  const startSession = useStartSession();

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  useEffect(() => {
    getSession();
    return navigation.addListener('focus', async () => {
      getSession();
    });
  }, [navigation, getSession]);

  if (loading) {
    return <LoadingScreen />;
  }

  const child = false;

  // const activeSubscription = !!data?.me?.subscription?.type;
  const session = data?.session?.session || {};
  const exercises = session?.exercises || [];
  const nbExercises = exercises.length;
  const hasPrerequisiteVideo = !!session?.prerequisiteVideo || false;
  const hasCountdownVideo = !!session?.countdownVideo || false;

  const start = async () => {
    try {
      if (hasPrerequisiteVideo) {
        goPrerequisites(id);
      } else if (hasCountdownVideo) {
        goCountdown(id);
      } else {
        const userSession = await startSession(id, false);
        goExercise(
          userSession?.userSessionId,
          userSession?.action?.entity?.id,
          userSession?.action?.entity?.exercise?.id,
          userSession?.action?.entity?.exercise?.video,
          session?.activity?.id,
          session?.id,
          userSession?.action?.entity?.exercise?.needsValidation,
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar hiddenIos />
      <ScrollView style={styles.containerScrollview}>
        <ChipSession
          imgURL={session?.activity?.image}
          sessionName={session?.name}
          activityName={session?.activity?.title}
          coaches={session?.coaches || []}
          backScreen={'Activity'}
          backParams={{id: session?.activity?.id, backScreen: 'Home'}}
        />
        <InfoSession
          intensity={
            session?.activity?.id === softAquagym
              ? 'Faible'
              : sessionIntensity(session?.difficulty)
          }
          time={`${((session?.duration || 0) / 60).toFixed(0)} min`}
          equipment={session?.withEquipment ? 'Oui' : 'Non'}
          intensityIcon={
            session?.activity?.id === softAquagym ? (
              <LowIntensityIcon />
            ) : (
              (session?.difficulty === 'MEDIUM' && <MediumIntensityIcon />) ||
              (session?.difficulty === 'LOW' && <LowIntensityIcon />) ||
              (session?.difficulty === 'HARD' && <HardIntensityIcon />)
            )
          }
          onPress={() => setInfoMusclelVisible(!infoMusclelVisible)}
          hasMuscleGroups={(session?.muscleGroups || []).length > 0}
        />
        {infoMusclelVisible ? (
          <InfoMuscle muscles={session.muscleGroups} />
        ) : null}

        {session?.withEquipment && (session?.equipments || []).length > 0 && (
          <InfoEquipment child={child} equipments={session.equipments} />
        )}

        <View style={styles.containerViewListExercice}>
          <Headline mode="h2">Exercices ({nbExercises})</Headline>
          <View style={styles.flatListStyle}>
            {exercises.map((item: any, i: number) => (
              <ListItemExercice
                key={i}
                image={item.thumbnail}
                nameExercice={item.name}
                descExercice={''}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.contentButtonFixe}>
        {/*{!activeSubscription ? (*/}
        {/*    <Button onPress={() => goSubscription()}>S'abonner maintenant</Button>*/}
        {/*) : (*/}
        <Button onPress={start}>Commencer</Button>
        {/*)}*/}
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {},
  container: {
    height: '100%',
    backgroundColor: colors.greyL,
  },
  containerViewListExercice: {
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  flatListStyle: {
    paddingTop: 18,
  },
  contentButtonFixe: {
    bottom: 0,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.greyL,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  containerScrollview: {
    marginBottom: 64,
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    flatListStyle: {
      justifyContent: 'space-between',
      paddingTop: 18,
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
  });
}

export default SeanceScreen;
