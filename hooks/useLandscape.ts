import {useEffect} from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export const useLandscape = () => {
  return useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);
};

export default useLandscape;
