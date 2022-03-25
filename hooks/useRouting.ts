import {useNavigation} from '@react-navigation/native';

type ScreensAvailables =
  | 'Exercise'
  | 'Congratulations'
  | 'Activity'
  | 'Home'
  | 'Login'
  | 'Requirements'
  | 'Player'
  | 'Session'
  | 'Prerequisites'
  | 'Countdown'
  | 'Stretching'
  | 'ChatBot'
  | 'AccountSubscription'
  | 'DiplomaForm'
  | 'Succès'
  | 'BadgeUnlocked';

export const useRouting = () => {
  const navigation = useNavigation();

  const goScreen = (screen: ScreensAvailables, params: Object = {}): void => {
    navigation.navigate(screen, params);
  };

  const goScreenWithReset = (
    screen: ScreensAvailables,
    params: Object = {},
  ): void => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: screen,
          params,
        },
      ],
    });
  };

  const goCongratulations = (
    activityId: string,
    userSessionId: string,
  ): void => {
    goScreenWithReset('Congratulations', {
      activityId,
      userSessionId,
    });
  };

  const goActivity = (id: string, params: any = {}): void => {
    goScreenWithReset('Activity', {
      id,
      ...params,
    });
  };

  const goCertificateForm = (
    activityId: string,
    activityName: string,
    id: string,
    level: number,
    name: string,
  ): void => {
    goScreenWithReset('DiplomaForm', {
      activityId,
      activityName,
      id,
      level,
      name,
    });
  };

  const goCertificate = (): void => {
    goScreenWithReset('Home', {
      screen: 'Succès',
      params: {
        screen: 'Succès',
        params: {
          activeTab: 'diploma',
        },
      },
    });
  };

  const goHome = (): void => {
    goScreenWithReset('Home');
  };

  const goLogin = (): void => {
    goScreenWithReset('Login');
  };

  const goSubscription = (): void => {
    goScreen('AccountSubscription');
  };

  const goRequirements = (video: string, sessionId: string): void => {
    goScreenWithReset('Requirements', {
      video,
    });
  };

  const goPrerequisites = (id: string): void => {
    goScreenWithReset('Prerequisites', {
      id,
    });
  };

  const goCountdown = (
    id: string,
    prerequisiteVideoSeen: boolean = false,
  ): void => {
    goScreenWithReset('Countdown', {
      id,
      prerequisiteVideoSeen,
    });
  };

  const goSession = (id: string): void => {
    goScreenWithReset('Session', {
      id,
    });
  };

  const goPlayer = (
    video: string,
    back: {screen: ScreensAvailables; params: {}},
    end: {screen: ScreensAvailables; params: {}},
  ): void => {
    goScreenWithReset('Player', {
      video,
      back,
      end,
    });
  };

  const goStretching = (
    activityId: string,
    userSessionId: string,
    unlockedBadges: any[] = [],
  ): void => {
    goScreenWithReset('Stretching', {
      activityId,
      userSessionId,
      unlockedBadges,
    });
  };

  const goExercise = (
    userSessionId: string,
    userExerciseId: string,
    exerciseId: string,
    video: string,
    activityId: string,
    sessionId: string,
    needsValidation: boolean,
  ): void => {
    goScreenWithReset('Exercise', {
      userSessionId,
      userExerciseId,
      exerciseId,
      video,
      activityId,
      sessionId,
      needsValidation,
    });
  };

  const goBadgeUnlocked = (
    badges: any,
    userSessionId: string,
    activityId: string,
    sessionId: string | null,
    action: any,
    callback: any,
  ): void => {
    goScreenWithReset('BadgeUnlocked', {
      badges,
      userSessionId,
      activityId,
      sessionId,
      action,
      callback,
    });
  };

  return {
    goScreen,
    goScreenWithReset,
    goHome,
    goCongratulations,
    goActivity,
    goCertificateForm,
    goCertificate,
    goExercise,
    goLogin,
    goRequirements,
    goPlayer,
    goPrerequisites,
    goCountdown,
    goSession,
    goStretching,
    goSubscription,
    goBadgeUnlocked,
  };
};
