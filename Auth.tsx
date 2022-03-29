import React, {createContext} from 'react';
import {
  getToken,
  setToken,
  removeToken,
  extractUserFromToken,
  UserInterface,
  SubscriptionType,
} from './utils';

interface AuthState {
  userToken: string | undefined | null;
  status: 'idle' | 'signOut' | 'signIn';
  user: UserInterface | null;
  subscriptionType: SubscriptionType;
}

type AuthAction =
  | {type: 'SIGN_IN'; token: string}
  | {type: 'SIGN_OUT'}
  | {type: 'SAVE_USER'; user: any};

type AuthPayload = string;

interface AuthContextActions {
  signIn: (data: AuthPayload) => void;
  signOut: () => void;
  saveUser: (data: any) => void;
}

interface AuthContextType extends AuthState, AuthContextActions {}

const AuthContext = createContext<AuthContextType>({
  status: 'idle',
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  saveUser: () => {},
  user: null,
  subscriptionType: 'freeTrial',
});

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    status: 'idle',
    userToken: null,
    user: null,
    subscriptionType: 'freeTrial',
  });

  React.useEffect(() => {
    const initState = async () => {
      const token = await getToken();
      if (token != null) {
        dispatch({type: 'SIGN_IN', token: token});
        return true;
      } else {
        dispatch({type: 'SIGN_OUT'});
        return false;
      }
    };
    initState().then(r => {
      console.debug(`Initialized ${r}`);
    });
  }, []);

  React.useImperativeHandle(AuthRef, () => authActions);

  const authActions: AuthContextActions = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        await setToken(token);
        dispatch({type: 'SIGN_IN', token});
      },

      signOut: async () => {
        await removeToken(); // TODO: use Vars
        dispatch({type: 'SIGN_OUT'});
      },

      saveUser: async (user: any) => {
        dispatch({type: 'SAVE_USER', user});
      },
    }),

    [],
  );

  return (
    <AuthContext.Provider value={{...state, ...authActions}}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...prevState,
        status: 'signIn',
        userToken: action.token,
        user: extractUserFromToken(action.token),
      };

    case 'SIGN_OUT':
      return {
        ...prevState,
        status: 'signOut',
        userToken: null,
        user: null,
      };

    case 'SAVE_USER':
      return {
        ...prevState,
        user: action.user,
      };
  }
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside an AuthProvider with a value');
  }
  const subscriptionType: SubscriptionType =
    context.user?.subscriptionData?.type || 'freeTrial';
  return {...context, subscriptionType};
};

export const AuthRef = React.createRef<AuthContextActions>();
