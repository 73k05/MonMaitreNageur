import React from 'react';
import DefaultLayout from './DefaultLayout';
import {useAuth} from '../../Auth';
import jwt_decode from 'jwt-decode';
import {appVersion} from '../../utils';

export const ConnectedLayout = ({children, ...props}: any) => {
  const {status, userToken, signOut, user} = useAuth();
  //console.log('Token', userToken);
  return withUser(<DefaultLayout {...props}>{children}</DefaultLayout>, {
    status,
    userToken,
    signOut,
    user,
  });
};

function withUser(Comp: any, userProps: any) {
  const {status, userToken, signOut} = userProps;
  if (status === 'signIn' && userToken) {
    const token: any = jwt_decode(userToken) || {};

    const d = new Date(0);
    d.setUTCSeconds(token?.exp);
    const now = new Date();
    const tokenExpired = !token || now > d;

    const versionOutdated =
      !token || (token.appVersion && token.appVersion !== appVersion());

    if (tokenExpired || versionOutdated) {
      signOut();
    }

    // const subscriptionData = user?.subscriptionData;
  }

  return Comp;
}

export default ConnectedLayout;
