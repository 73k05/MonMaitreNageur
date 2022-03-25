import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ConnectedLayout,
  Text,
  Button,
  Headline,
  AppStatusBar,
} from '../components';
import {colors} from '../assets/style';
import * as ScreenOrientation from 'expo-screen-orientation';
import Screen from '../hocs/Screen';
import {useRoute} from '@react-navigation/native';
import {useMmnQuery, useRouting} from '../hooks';
import {childrenActivityId} from '../utils/activity';
import {USER_SESSION} from '../configs/queries';
import LoadingScreen from './LoadingScreen';

export const CongratulationsScreen = Screen(() => {
  const route = useRoute();
  const {goActivity, goCertificateForm} = useRouting();
  const {activityId, userSessionId}: any = route.params;
  const [congratulationMessage, setCongratulationMessage] = useState(
    'Vous venez de terminer votre séance !',
  );
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const {data, loading} = useMmnQuery(USER_SESSION(userSessionId));

  useEffect(() => {
    if (!data) {
      return;
    }
    if (childrenActivityId.indexOf(activityId) !== -1) {
      if (
        data?.userSession?.userSession?.isLastSessionForLevel &&
        data?.userSession?.userSession?.levelCompletedWithoutFailure
      ) {
        setCongratulationMessage('Votre enfant vient de terminer ce niveau !');
        setShowCertificateForm(true);
      } else {
        setCongratulationMessage(
          'Votre enfant vient de terminer cette séance !',
        );
      }
    }
  }, [activityId, data]);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <ConnectedLayout bg={colors.blueL}>
      <AppStatusBar />
      <View style={styles.containAlignement}>
        <Headline fontColor="white" center>
          Félicitations !
        </Headline>
        <Text center mode="body">
          {congratulationMessage}
        </Text>
        <View style={[styles.paddingView, styles.alignButtonView]}>
          <Button
            mode="contained"
            color="primary"
            onPress={() =>
              showCertificateForm
                ? goCertificateForm(
                    activityId,
                    data?.userSession?.userSession?.session?.activity?.title,
                    data?.userSession?.userSession?.session?.id,
                    data?.userSession?.userSession?.session?.level,
                    data?.userSession?.userSession?.session?.name,
                  )
                : goActivity(activityId, {backScreen: 'Home'})
            }>
            {showCertificateForm ? 'Suivant' : 'Retour à la page activité'}
          </Button>
        </View>
      </View>
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  containAlignement: {
    height: '93%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingView: {
    paddingTop: 30,
  },
  alignButtonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CongratulationsScreen;
