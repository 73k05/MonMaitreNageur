import SInfo from 'react-native-sensitive-info';
import jwt_decode from 'jwt-decode';

const TOKEN = 'token';
const SHARED_PERFS = 'ObytesSharedPerfs';
const KEYCHAIN_SERVICE = 'ObytesKeychain';
const keyChainOptions = {
    sharedPreferencesName: SHARED_PERFS,
    keychainService: KEYCHAIN_SERVICE,
};

export async function getItem<T>(key: string): Promise<T | null> {
    console.log('Get item, key: ' + key);
    console.log(SInfo);
    const value = SInfo.getItem(key, keyChainOptions).then(value => {
        console.log('Get item in then ');
        console.log(value)
        return value ? JSON.parse(value)?.[key] || null : null;
    }).catch(reason => {
        console.log('Get item error: ' + reason);
    });
    console.log('Get item value: ' + value);
    return null;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
    console.log('setItem', key, value);
    SInfo.setItem(key, JSON.stringify({[key]: value}), keyChainOptions);
}
export async function removeItem(key: string): Promise<void> {
    SInfo.deleteItem(key, keyChainOptions);
}

export const getToken = () => getItem<string>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: string) => setItem<string>(TOKEN, value);

export const extractUserFromToken = (token: any): null | UserInterface => {
    const payload: any = jwt_decode(token);
    const user: UserInterface | undefined = {...payload?.utilisateur, subscriptionData: payload?.subscriptionData};
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
    active: boolean
    autoRenew: boolean
    nextRenewal: string
    type: SubscriptionType
}

export type SubscriptionType = 'freeTrial' | 'monthly' | 'yearly'
