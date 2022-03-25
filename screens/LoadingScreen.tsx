import {ActivityIndicator, View} from 'react-native';
import {colors} from '../assets/style';
import React from 'react';

export const LoadingScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={colors.pinkD} />
    </View>
  );
};

export default LoadingScreen;
