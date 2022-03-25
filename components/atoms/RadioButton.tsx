import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '../';
import {fonts, colors} from '../../assets/style';

export const RadioButton = ({
  mode = 'chatBot',
  value,
  onPress = () => {},
  label,
}: any) => {
  const styles: any = makeStyles();
  return mode === 'chatBot' ? (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <View style={styles[`${mode}RadioButton`]}>
        <Text center style={styles[`${mode}RadioText`]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.radioButtonContainer, styles.w100]}>
      <View style={[styles.radioButton, styles[`${mode}RadioButton`]]}>
        <Text center style={styles[`${mode}RadioText`]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = () => {
  return StyleSheet.create({
    radioButtonContainer: {
      alignSelf: 'baseline',
    },
    w100: {
      width: '100%',
    },
    radioButton: {
      borderRadius: 8,
      justifyContent: 'center',
      height: 48,
      paddingLeft: 18,
      paddingRight: 18,
    },

    /**
     * Mode = unchecked
     */
    uncheckedRadioButton: {
      backgroundColor: colors.greyD,
    },
    uncheckedRadioText: {
      color: colors.white,
      fontFamily: fonts.cm,
      textTransform: 'uppercase',
      fontSize: 14,
    },

    /**
     * Mode = secondary
     */
    secondaryRadioButton: {
      backgroundColor: colors.blueL,
    },
    secondaryRadioText: {
      color: colors.white,
      fontFamily: fonts.cm,
      textTransform: 'uppercase',
      fontSize: 14,
    },

    /**
     * Mode = primary
     */
    primaryRadioButton: {
      backgroundColor: colors.pinkD,
    },
    primaryRadioText: {
      color: colors.white,
      fontFamily: fonts.cm,
      textTransform: 'uppercase',
      fontSize: 14,
    },

    /**
     * Mode = secondaryDark
     */
    secondaryDarkRadioButton: {
      backgroundColor: colors.blueD,
    },
    secondaryDarkRadioText: {
      color: colors.white,
      fontFamily: fonts.cm,
      textTransform: 'uppercase',
      fontSize: 14,
    },

    /**
     * Mode = chatBot
     */
    chatBotRadioButton: {
      // width: '15%',
      borderRadius: 100,
      backgroundColor: colors.greyD,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatBotRadioText: {
      color: colors.blueD,
      paddingBottom: 4,
      paddingTop: 4,
      paddingLeft: 13,
      paddingRight: 13,
      fontSize: 16,
      fontFamily: fonts.ssp,
    },
  });
};

export default RadioButton;
