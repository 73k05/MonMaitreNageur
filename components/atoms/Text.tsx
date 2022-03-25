import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text as TextRnp} from 'react-native-paper';
import Device from 'react-native-device-detection';
import {fonts, Palette, paletteFonts} from '../../assets/style';

export const Text = ({
  mode = 'small',
  weight = 'regular',
  fontColor = 'white',
  center = false,
  transform = undefined,
  style = {},
  children,
}: TextInterface) => (
  <View>
    <TextRnp
      style={[
        {
          color: paletteFonts[fontColor].text,
        },
        styles[`${mode}Text`],
        styles[`${weight}Text`],
        transform && styles[`${transform}Text`],
        center && styles.center,
        style,
      ]}>
      {children}
    </TextRnp>
  </View>
);

interface TextInterface {
  mode?: TextMode;
  backgroundDark?: boolean;
  weight?: TextWeight;
  fontColor?: Palette;
  transform?: TextTransform;
  center?: boolean;
  style?: Object;
  children?: React.ReactNode;
}

export type TextMode = 'little' | 'small' | 'body' | 'big';
export type TextTransform = 'uppercase';
export type TextWeight = 'light' | 'regular' | 'semibold' | 'bold';

const styles = StyleSheet.create<any>({
  /**
   * Mode = Little
   */
  littleText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: fonts.ssp,
  },
  /**
   * Mode = Small
   */
  smallText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts.ssp,
  },
  /**
   * Mode = Body
   */
  bodyText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fonts.ssp,
  },

  /**
   * Mode = big
   */
  bigText: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: fonts.ssp,
  },

  bodyCmText: {
    fontSize: 15,
    fontFamily: fonts.cm,
  },

  /**
   * transform = uppercase
   */
  uppercaseText: {
    textTransform: 'uppercase',
  },

  /**
   * weight = light
   */
  lightText: {
    fontWeight: '300',
  },
  /**
   * weight = regular
   */
  regularText: {
    fontWeight: '400',
  },
  /**
   * weight = bold
   */
  boldText: {
    fontWeight: '700',
  },
  /**
   * weight = semibold
   */
  semiboldText: {
    fontWeight: '600',
  },

  center: {
    textAlign: 'center',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    /**
     * Mode = Little
     */
    littleText: {
      fontSize: 14,
      fontFamily: fonts.ssp,
    },
    /**
     * Mode = Small
     */
    smallText: {
      fontSize: 16,
      fontFamily: fonts.ssp,
    },
    /**
     * Mode = Body
     */
    bodyText: {
      fontSize: 18,
      fontFamily: fonts.ssp,
    },

    /**
     * Mode = big
     */
    bigText: {
      fontSize: 20,
      fontFamily: fonts.ssp,
    },

    bodyCmText: {
      fontSize: 18,
      fontFamily: fonts.cm,
    },
  });
}

export default Text;
