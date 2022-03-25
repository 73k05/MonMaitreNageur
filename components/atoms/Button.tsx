import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button as ButtonRnp, IconButton} from 'react-native-paper';
import {fonts, Palette, palettes, colors} from '../../assets/style';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {DownloadIcon} from '../../components';

export const Button = ({
  color = 'primary',
  mode = 'contained',
  style = {},
  disabled = false,
  icon = '',
  onPress = () => {},
  size = 'normal',
  square = false,
  children,
  ...props
}: ButtonInterface) => {
  const styles = makeStyles({color, disabled});

  const customTheme = {
    colors: {
      primary: colors.pinkD,
    },
  };

  return mode === 'icon' ? (
    square ? (
      <TouchableOpacity
        {...props}
        onPress={onPress}
        style={[styles.squareIcon, styles[`${mode}Button`]]}>
        <DownloadIcon />
      </TouchableOpacity>
    ) : (
      <View style={styles.shadowIcon}>
        <IconButton
          color={palettes[color].text}
          style={[styles.icon, styles[`${mode}Button`]]}
          icon={icon}
          onPress={onPress}
        />
      </View>
    )
  ) : (
    <ButtonRnp
      style={[styles.button, styles[`${mode}Button`], style]}
      labelStyle={[styles.text, styles[`${mode}Text`], styles[`${size}Size`]]}
      onPress={onPress}
      theme={customTheme}
      {...props}>
      {children}
    </ButtonRnp>
  );
};

interface ButtonInterface {
  color?: Palette;
  mode?: ButtonMode;
  style?: Object;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: IconSource;
  onPress?: any;
  square?: boolean;
  size?: 'normal' | 'small';
}

export type ButtonMode =
  | 'contained'
  | 'icon'
  | 'text'
  | 'outlined'
  | 'bubble'
  | 'square';

const makeStyles = ({
  color,
  disabled,
}: {
  color: Palette;
  disabled: boolean;
}): any => {
  const c: Palette = disabled ? 'disabled' : color;

  return StyleSheet.create({
    button: {
      padding: 8,
      borderRadius: 4,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontFamily: fonts.cm,
      fontSize: 14,
    },
    smallSize: {
      fontSize: 12,
    },
    icon: {
      padding: 8,
      borderRadius: 50,
      width: 54,
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadowIcon: {
      shadowColor: '#002E72',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    /**
     * Mode = contained
     */
    containedButton: {
      backgroundColor: palettes[c].bg,
    },
    containedText: {
      color: palettes[c].text,
    },
    iconButton: {
      backgroundColor: palettes[c].bg,
    },
    bubbleButton: {
      padding: 0,
      backgroundColor: palettes[c].bg,
      borderRadius: 100,
    },
    bubbleText: {
      letterSpacing: 0.1,
      fontFamily: fonts.ssp,
      textTransform: 'none',
      fontWeight: 'normal',
      color: palettes[c].text,
      fontSize: 16,
    },
    /**
     * Mode = outlined
     */
    outlinedButton: {
      borderWidth: 1,
      borderColor: palettes[c].border,
      backgroundColor: 'transparent',
    },
    outlinedText: {
      color: palettes[c].bg,
      backgroundColor: 'transparent',
    },
    /**
     * Mode = text
     */
    textButton: {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
    textText: {
      paddingTop: 10,
      paddingBottom: 10,
      color: palettes[c].bg,
      backgroundColor: 'transparent',
    },
    /**
     * Mode = square
     */
    squareIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: palettes[c].bg,
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
      minWidth: 60,
      minHeight: 60,
    },
  });
};

export default Button;
