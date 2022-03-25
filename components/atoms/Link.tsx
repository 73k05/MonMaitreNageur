import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, fonts} from '../../assets/style';

export const Link = ({
  mode = 'bold',
  onPress = () => {},
  style = {},
  backgroundDark = false,
  underline = false,
  children,
}: LinkInterface) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={[
        styles[`${mode}Link`],
        backgroundDark ? styles.cWhite : styles.cBlue,
        underline ? styles.underline : styles.noUnderline,
        style,
      ]}>
      {children}
    </Text>
  </TouchableOpacity>
);

interface LinkInterface {
  mode?: 'bold' | 'default';
  onPress?: any;
  style?: Object;
  backgroundDark?: boolean;
  underline?: boolean;
  children?: React.ReactNode;
}

const styles = StyleSheet.create<any>({
  /**
   * Mode = bold
   */
  boldLink: {
    fontSize: 12,
    fontFamily: fonts.ssp,
    fontWeight: '700',
  },
  /**
   * Mode = default
   */
  defaultLink: {
    fontSize: 12,
    fontFamily: fonts.ssp,
  },
  cBlue: {
    color: colors.blueD,
  },
  cWhite: {
    color: colors.white,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  noUnderline: {
    textDecorationLine: 'none',
  },
});

export default Link;
