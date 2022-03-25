import {useCallback} from 'react';
import {START_SESSION} from '../configs/queries';
import useMmnMutation from './useMmnMutation';

export const useStartSession = () => {
  const [startSession] = useMmnMutation(START_SESSION);

  return useCallback(
    async (sessionId, prerequisiteVideoSeen) => {
      const r = await startSession({
        sessionId,
        prerequisiteVideoSeen,
      });
      return r?.startSession;
    },
    [startSession],
  );
};

export default useStartSession;
