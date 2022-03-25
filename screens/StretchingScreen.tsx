import React, {useCallback} from 'react';
import {Player} from '../components';
import {useRoute} from '@react-navigation/native';
import {useRouting} from '../hooks';
import {STRETCHING_VIDEO} from '../configs';

export const StretchingScreen = () => {
  const route = useRoute();
  const {activityId, userSessionId, badges}: any = route.params;
  const {goCongratulations, goBadgeUnlocked} = useRouting();

  const handleBack = useCallback(() => {
    if (Array.isArray(badges) && badges.length > 0) {
      goBadgeUnlocked(
        badges,
        userSessionId,
        activityId,
        null,
        null,
        goCongratulations,
      );
      return;
    }
    goCongratulations(activityId, userSessionId);
  }, [badges, goCongratulations, activityId, userSessionId, goBadgeUnlocked]);

  const handleEndVideo = useCallback(async () => {
    if (Array.isArray(badges) && badges.length > 0) {
      goBadgeUnlocked(
        badges,
        userSessionId,
        activityId,
        null,
        null,
        goCongratulations,
      );
      return;
    }
    goCongratulations(activityId, userSessionId);
  }, [badges, goCongratulations, activityId, userSessionId, goBadgeUnlocked]);

  return (
    <Player video={STRETCHING_VIDEO} back={handleBack} end={handleEndVideo} />
  );
};

export default StretchingScreen;
