import React, {useCallback} from 'react';
import {Player} from '../components';
import {SESSION} from '../configs/queries';
import {useRoute} from '@react-navigation/native';
import useMmnQuery from '../hooks/useMmnQuery';
import LoadingScreen from './LoadingScreen';
import {useStartSession, useRouting} from '../hooks';

export const CountdownScreen = () => {
  const route = useRoute();
  const {id, prerequisiteVideoSeen}: any = route.params;
  const {goSession, goExercise} = useRouting();
  const startSession = useStartSession();
  const {data, loading} = useMmnQuery(SESSION(id));
  const session = data?.session?.session;
  const video = session?.countdownVideo;

  const handleBack = useCallback(() => {
    goSession(id);
  }, [id, goSession]);

  const handleEndVideo = useCallback(async () => {
    const userSession = await startSession(id, prerequisiteVideoSeen || false);
    goExercise(
      userSession?.userSessionId,
      userSession?.action?.entity?.id,
      userSession?.action?.entity?.exercise?.id,
      userSession?.action?.entity?.exercise?.video,
      session?.activity?.id,
      session?.id,
      userSession?.action?.entity?.exercise?.needsValidation,
    );
  }, [session, startSession, id, prerequisiteVideoSeen, goExercise]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <Player video={video} back={handleBack} end={handleEndVideo} />;
};

export default CountdownScreen;
