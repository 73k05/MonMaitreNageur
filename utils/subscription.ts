import {ANDROID_PACKAGE_NAME} from '../configs';
import {Platform} from 'react-native';

export const getSubscriptionManagementLink = (
  userSubscription: any,
): string => {
  switch (userSubscription.os) {
    case 'ios':
      return 'https://apps.apple.com/account/subscriptions';
    case 'android':
      return `https://play.google.com/store/account/subscriptions?package=${ANDROID_PACKAGE_NAME}&sku=${
        userSubscription.type === 'monthly'
          ? 'abonnementmensuel'
          : 'abonnementannuel'
      }`;
    default:
      throw new Error('OS non supporté');
  }
};

export const subscriptionsIds = Platform.select({
  ios: ['abonnementmensuel999', 'abonnementannuel8999'],
  android: ['abonnementmensuel', 'abonnementannuel'],
});
