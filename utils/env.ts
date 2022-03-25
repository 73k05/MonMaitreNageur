import {Platform} from 'react-native';
import Device from 'react-native-device-detection';
import {ANDROID_APP_VERSION, IOS_APP_VERSION} from '../configs';

export const osName = (): string => {
  return Platform.OS;
};

export const appVersion = (): string => {
  switch (osName()) {
    case 'ios':
      return IOS_APP_VERSION;
    case 'android':
      return ANDROID_APP_VERSION;
    default:
      throw new Error('OS non supporté');
  }
};

export const deviceName = (): string => {
  return Device.isPhone ? 'Phone' : Device.isTablet ? 'Tablet' : 'Unknown';
};

export const getVideoUrlActivity = (a: any): string => {
  switch (a?.id) {
    case 'dxaou8': // Aquagym Douce
      return 'https://player.vimeo.com/external/571653330.hd.mp4?s=a2a396d7df1abdf612b7954e6bbbbce1702143f1&profile_id=175';
    case 'dc95gc': // Aquagym Tonique
      return 'https://player.vimeo.com/external/571653361.hd.mp4?s=0a025f54b12ed95fcb925ef3a16efe628d37671c&profile_id=175';
    case 'mk5cnw': // Bébés nageurs
      return 'https://player.vimeo.com/external/571653425.hd.mp4?s=2e67944f2a9537d28ea7287e3d086e2bfbf3d446&profile_id=175';
    case 'au0gm1': // Prénatale
      return 'https://player.vimeo.com/external/571653494.hd.mp4?s=34314db3ec9c3ca6c15654dcff89f6586f345927&profile_id=175';
  }

  return 'https://player.vimeo.com/external/571653450.hd.mp4?s=eabd8b993ae19dd23591ec1aa5fb83bda8e6c80b&profile_id=175';
};
