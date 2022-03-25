import React, {useCallback, useState} from 'react';
import {OverlayStretch, OverlayExercise, Player} from '../components';
import {useRoute} from '@react-navigation/native';
import {useRouting, useMmnMutation} from '../hooks';
import {END_SESSION, END_SESSION_EXERCISE} from '../configs/queries';
import {babyActivityId} from '../utils/activity';

export const ExerciseScreen = () => {
  const {
    goCongratulations,
    goExercise,
    goSession,
    goStretching,
    goBadgeUnlocked,
  } = useRouting();
  const route = useRoute();
  const {
    userSessionId,
    userExerciseId,
    activityId,
    video,
    sessionId,
    needsValidation,
  }: any = route.params;
  const [stretchOverlay, showStretchOverlay] = useState(false);
  const [confirmationOverlay, showConfirmationOverlay] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  const [endSessionExercise] = useMmnMutation(END_SESSION_EXERCISE);
  const [endSession] = useMmnMutation(END_SESSION);

  const handleNextSessionStep = useCallback(
    async action => {
      let endSessionResult: any;
      switch (action?.type) {
        case 'EXERCISE':
          const newUserExerciseId = action?.entity?.id;
          const newExerciseId = action?.entity?.exercise?.id;
          const newVideo = action?.entity?.exercise?.video;
          const confirmation = action?.entity?.exercise?.needsValidation;

          goExercise(
            userSessionId,
            newUserExerciseId,
            newExerciseId,
            newVideo,
            activityId,
            sessionId,
            confirmation,
          );

          break;
        case 'STRETCHING':
          endSessionResult = await endSession({userSessionId});
          setUnlockedBadges(endSessionResult?.newBadges);
          showStretchOverlay(true);
          break;
        default:
          endSessionResult = await endSession({userSessionId});
          const badges = endSessionResult?.newBadges;
          if (Array.isArray(badges) && badges.length > 0) {
            goBadgeUnlocked(
              badges,
              userSessionId,
              activityId,
              sessionId,
              null,
              goCongratulations,
            );
            return;
          }
          goCongratulations(activityId, userSessionId);
          break;
      }
    },
    [
      goExercise,
      userSessionId,
      activityId,
      sessionId,
      endSession,
      goCongratulations,
      goBadgeUnlocked,
    ],
  );

  const endExercise = useCallback(async () => {
    try {
      const r = await endSessionExercise({
        userSessionExerciseId: userExerciseId,
        failure: false,
      });
      const data = r?.endSessionExercise;
      const action = data?.action;
      const badges = data?.newBadges;

      if (Array.isArray(badges) && badges.length > 0) {
        goBadgeUnlocked(
          badges,
          userSessionId,
          activityId,
          sessionId,
          action,
          handleNextSessionStep,
        );
        return;
      }

      await handleNextSessionStep(action);
    } catch (err) {
      console.error(err);
    }
  }, [
    userExerciseId,
    endSessionExercise,
    handleNextSessionStep,
    goBadgeUnlocked,
    userSessionId,
    activityId,
    sessionId,
  ]);

  const endExerciseWithFailure = useCallback(async () => {
    try {
      const r = await endSessionExercise({
        userSessionExerciseId: userExerciseId,
        failure: true,
      });
      const data = r?.endSessionExercise;
      const action = data?.action;
      const badges = data?.newBadges;

      if (Array.isArray(badges) && badges.length > 0) {
        goBadgeUnlocked(
          badges,
          userSessionId,
          activityId,
          sessionId,
          action,
          handleNextSessionStep,
        );
        return;
      }

      await handleNextSessionStep(action);
    } catch (err) {
      console.error(err);
    }
  }, [
    userExerciseId,
    endSessionExercise,
    handleNextSessionStep,
    goBadgeUnlocked,
    userSessionId,
    activityId,
    sessionId,
  ]);

  const handleBackForExercise = useCallback(() => {
    goSession(sessionId);
  }, [sessionId, goSession]);

  const handleBackForStretching = useCallback(() => {
    if (Array.isArray(unlockedBadges) && unlockedBadges.length > 0) {
      goBadgeUnlocked(
        unlockedBadges,
        userSessionId,
        activityId,
        sessionId,
        null,
        goCongratulations,
      );
      return;
    }
    goCongratulations(activityId, userSessionId);
  }, [
    activityId,
    goBadgeUnlocked,
    goCongratulations,
    sessionId,
    unlockedBadges,
    userSessionId,
  ]);

  const handleGoStretchVideo = useCallback(() => {
    goStretching(activityId, userSessionId, unlockedBadges);
  }, [goStretching, activityId, userSessionId, unlockedBadges]);

  const handleEndExerciseFailure = useCallback(async () => {
    if (activityId === babyActivityId) {
      await endSessionExercise({
        userSessionExerciseId: userExerciseId,
        failure: true,
      });
      goSession(sessionId);
      return;
    }

    await endExerciseWithFailure();
  }, [
    activityId,
    endExerciseWithFailure,
    endSessionExercise,
    userExerciseId,
    goSession,
    sessionId,
  ]);

  const handleEndExerciseConfirmation = useCallback(() => {
    showConfirmationOverlay(true);
  }, [showConfirmationOverlay]);

  const handleEndExercise = useCallback(() => {
    needsValidation ? handleEndExerciseConfirmation() : endExercise();
  }, [needsValidation, handleEndExerciseConfirmation, endExercise]);

  return (
    <>
      <Player
        video={video}
        end={handleEndExercise}
        back={handleBackForExercise}
      />
      {stretchOverlay && (
        <OverlayStretch
          onGo={handleGoStretchVideo}
          onClose={handleBackForStretching}
        />
      )}
      {confirmationOverlay && (
        <OverlayExercise
          onPressYes={endExercise}
          onPressNo={handleEndExerciseFailure}
        />
      )}
    </>
  );
};

export default ExerciseScreen;
