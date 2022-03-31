import {useLazyQuery} from '@apollo/client';
import {useAuth} from '../Auth';
import {useCallback} from 'react';

export const useMmnLazyQuery = (GQL: any, options = {}) => {
  const [fetch, {data, loading, error}] = useLazyQuery(GQL, options);
  const {signOut} = useAuth();

  if (data) {
    const queries = Object.keys(data);
    queries.map(queryName => {
      if (data[queryName]?.success === false) {
        const errorCode = data[queryName]?.errorCode || 'UNKNOWN_ERROR';
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
      }
    });
  }

  const load = useCallback(async () => {
    fetch();
  }, [fetch]);

  return [load, {data, loading, error}];
};

export default useMmnLazyQuery;
