import {useQuery} from '@apollo/client';
import {useAuth} from '../Auth';

export const useMmnQuery = (GQL: any) => {
  const {data, loading, error, refetch} = useQuery(GQL, {
    fetchPolicy: 'no-cache', // A voir si on laisse, en tout cas ça empêche le bug de chargement infini quand on dev et que l'émulateur se reload
  });
  const {signOut} = useAuth();

  if (data) {
    const queries = Object.keys(data);
    queries.map(queryName => {
      if (data[queryName]?.success === false) {
        const errorCode = data[queryName]?.errorCode || 'UNKNOWN_ERROR';
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

  return {data, loading, error, refetch};
};

export default useMmnQuery;
