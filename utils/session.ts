import {Alert} from 'react-native';

export const startSessionAndGoExercise = async (
  mutation: any,
  sessionId: any,
  prerequisiteVideoSeen: any,
  activityId: any,
  goExercise: any,
) => {
  const r = await mutation({
    variables: {sessionId, prerequisiteVideoSeen},
    fetchPolicy: 'no-cache',
  });
  const d = r?.data?.startSession;
  const {success, message, action} = d;
  if (success === false) {
    Alert.alert('Erreur', message);
  } else {
    const e = action?.entity?.exercise;
    goExercise(
      d?.userSessionId,
      action?.entity?.id,
      e?.id,
      e?.video,
      activityId,
      sessionId,
    );
  }
};
