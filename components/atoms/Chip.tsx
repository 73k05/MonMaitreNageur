import React from 'react';
import {StyleSheet} from 'react-native';
import {Chip as ChipRnp} from 'react-native-paper';

import {fonts, Palette, palettes} from '../../assets/style';

export const Chip = ({
  color = 'primary',
  children,
  mode = 'contained',
  ...props
}: any) => {
  const styles = makeStyles({color, ...props});

  return (
    <ChipRnp
      mode={mode}
      style={[styles.chip, styles[`${mode}Chip`]]}
      textStyle={[styles.text, styles[`${mode}Text`]]}
      textColor={styles[`${mode}Text`]}
      {...props}>
      {children}
    </ChipRnp>
  );
};

const makeStyles = ({color, disabled}: any): any => {
  const c: Palette = disabled ? 'disabled' : color;

  return StyleSheet.create({
    chip: {
      alignSelf: 'center',
      borderRadius: 4,
      marginLeft: 5,
      marginRight: 5,
    },
    text: {
      textAlign: 'center',
      fontFamily: fonts.ssp,
      fontSize: 14,
    },

    /**
     * Mode = flat
     */
    flatChip: {
      backgroundColor: palettes[c].bg,
    },
    flatText: {
      color: palettes[c].text,
    },

    /**
     * Mode = outlined
     */
    outlinedChip: {
      backgroundColor: 'transparent',
      borderColor: palettes[c].bg,
    },
    outlinedText: {
      color: palettes[c].bg,
      backgroundColor: 'transparent',
    },
  });
};

export default Chip;
