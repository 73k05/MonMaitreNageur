import {useMutation} from '@apollo/client';
import {useCallback} from 'react';
import {useAuth} from '../Auth';

export const useMmnMutation = (GQL: any) => {
  const [mutation] = useMutation(GQL);
  const {signOut} = useAuth();

  const executeMutation = useCallback(
    async (vars: {}) => {
      const r = await mutation({variables: vars, fetchPolicy: 'no-cache'});

      if (r?.data?.success === false) {
        const errorCode = r?.data?.errorCode || 'UNKNOWN_ERROR';
        console.error(errorCode);
        switch (errorCode) {
          case 'INVALID_TOKEN_NO_USER':
          case 'INVALID_TOKEN_MISSING_DATA':
          case 'INVALID_TOKEN_WRONG_APP_VERSION':
          case 'INVALID_TOKEN':
          case 'TOKEN_EXPIRED':
            signOut();
            break;
        }
        return false;
      } else {
        return r?.data;
      }
    },
    [mutation, signOut],
  );

  return [executeMutation];
};

export default useMmnMutation;
