import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const TOKEN = 'token';
const keyChainOptions = {requireAuthentication: false};

export async function getItem(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key, keyChainOptions);
}

export async function setItem(key: string, value: string): Promise<void> {
  await SecureStore.setItemAsync(key, value, keyChainOptions)
    .then(() => {
      return true;
    })
    .catch(reason => {
      console.error(`Not save ${reason}`);
      return false;
    });
}

export async function removeItem(key: string): Promise<void> {
  SecureStore.deleteItemAsync(key);
}

export const getToken = () => getItem(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: string) => setItem(TOKEN, value);

export const extractUserFromToken = (token: any): null | UserInterface => {
  const payload: any = jwt_decode(token);
  const user: UserInterface | undefined = {
    ...payload?.utilisateur,
    subscriptionData: payload?.subscriptionData,
  };
  return user || null;
};

export interface UserInterface {
  id: string;
  email: string;
  lastname?: string;
  firstname?: string;
  birthday?: string;
  formal?: boolean;
  civility?: 1 | 2 | 3;
  createdAt?: string;
  subscriptionData?: SubscriptionDataInterface;
}

interface SubscriptionDataInterface {
  active: boolean;
  autoRenew: boolean;
  nextRenewal: string;
  type: SubscriptionType;
}

export type SubscriptionType = 'freeTrial' | 'monthly' | 'yearly';
