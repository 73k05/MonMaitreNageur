import React from 'react';
import PropTypes from 'prop-types';
import {Platform, StatusBar} from 'react-native';

export const AppStatusBar = ({
  transparent,
  hiddenIos = Platform.OS !== 'ios' ? true : false,
  ...props
}: any) => {
  return (
    <StatusBar
      {...props}
      barStyle={transparent ? 'dark-content' : 'light-content'}
      translucent
      hidden={hiddenIos}
      backgroundColor={'transparent'}
    />
  );
};

AppStatusBar.defaultProps = {
  transparent: false,
};

AppStatusBar.propTypes = {
  transparent: PropTypes.bool,
};

export default AppStatusBar;
