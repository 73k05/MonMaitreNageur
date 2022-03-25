import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {DotsIcon} from '../';

import {fonts, Palette, palettes} from '../../assets/style';

interface ItemBubbleInterface {
  color?: Palette;
  children?: React.ReactNode;
  mode?: 'left' | 'right';
  typeIn?: boolean;
  style?: Object;
  disabled?: boolean;
}

export const ItemBubble = ({
  color = 'primary',
  children,
  mode = 'right',
  typeIn,
  style = {},
  disabled = false,
}: ItemBubbleInterface) => {
  const styles: any = makeStyles({color, disabled});

  return (
    <View
      style={[
        mode === 'right' ? styles.boxRight : styles.box,
        styles[`${mode}Bubble`],
        style,
        color === 'white' && {
          marginRight: 4,
          paddingHorizontal: 30,
          borderRadius: 30,
          shadowColor: '#002E7226',
          shadowRadius: 4,
          shadowOpacity: 0.8,
          shadowOffset: {width: 0, height: 0},
        },
      ]}>
      {typeIn ? (
        <DotsIcon />
      ) : (
        <Text style={[styles.text, styles[`${mode}Text`]]}>{children}</Text>
      )}
    </View>
  );
};

const makeStyles = ({color, disabled}: any) => {
  const c: Palette = disabled ? 'disabled' : color;

  return StyleSheet.create({
    root: {},
    box: {
      padding: 20,
      alignSelf: 'flex-start',
      maxWidth: 300,
      marginTop: 10,
      marginBottom: 10,
    },
    boxRight: {
      padding: 20,
      alignSelf: 'flex-end',
      maxWidth: 300,
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      fontFamily: fonts.ssp,
      fontSize: 16,
    },

    /**
     * Mode = Left
     */
    leftBubble: {
      backgroundColor: palettes[c].bg,
      borderBottomRightRadius: 50,
      borderTopRightRadius: 50,
      borderTopLeftRadius: 30,
    },
    leftText: {
      color: palettes[c].text,
    },
    /**
     * Mode = Right
     */
    rightBubble: {
      backgroundColor: palettes[c].bg,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 50,
    },
    rightText: {
      color: palettes[c].text,
      textAlign: 'right',
    },
  });
};

export default ItemBubble;
