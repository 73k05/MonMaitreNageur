import * as React from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {fonts, palettes, Palette, paletteFonts} from '../../assets/style';

export const Headline = ({
  mode = 'h1',
  style = {},
  center = false,
  color = 'primary',
  fontColor = 'tertiary',
  transform,
  divider = false,
  children,
}: HeadlineInterface) => {
  return (
    <View>
      <Text
        style={[
          {color: paletteFonts[fontColor].text},
          styles.root,
          styles[`${mode}Headline`],
          styles[`${transform}Text`],
          center ? styles.center : null,
          style,
        ]}>
        {children}
      </Text>
      {divider ? (
        <Divider
          style={[
            {
              borderColor: palettes[color].border,
              backgroundColor: palettes[color].bg,
            },
            styles.dividerH1,
          ]}
        />
      ) : null}
    </View>
  );
};

interface HeadlineInterface {
  mode?: HeadlineMode;
  style?: Object;
  center?: boolean;
  color?: Palette;
  fontColor?: Palette;
  disabled?: boolean;
  divider?: boolean;
  children?: React.ReactNode;
  transform?: string;
}

export type HeadlineMode = 'h1' | 'h2' | 'h3' | 'h4' | 'number';

const styles: any = StyleSheet.create({
  root: {
    paddingTop: 4,
  },
  numberHeadline: {
    fontSize: 86,
    fontFamily: fonts.ssp,
    fontWeight: 'bold',
  },
  /**
   * Mode = h1
   */
  h1Headline: {
    fontSize: 30,
    fontFamily: fonts.cm,
    fontWeight: 'bold',
  },
  dividerH1: {
    borderWidth: 3,
    width: 22,
    marginTop: 4,
  },

  /**
   * Mode = h2
   */
  h2Headline: {
    fontSize: 25,
    fontFamily: fonts.cm,
    fontWeight: 'bold',
  },

  /**
   * Mode = h3
   */
  h3Headline: {
    fontSize: 23,
    fontFamily: fonts.ssp,
    fontWeight: 'bold',
  },

  /**
   * Mode = h4
   */
  h4Headline: {
    fontSize: 16,
    fontFamily: fonts.cm,
    fontWeight: 'bold',
  },

  center: {
    textAlign: 'center',
  },

  /**
   * transform = uppercase
   */
  uppercaseText: {
    textTransform: 'uppercase',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    h1Headline: {
      fontSize: 36,
      fontFamily: fonts.cm,
      fontWeight: 'bold',
    },
    h2Headline: {
      fontSize: 30,
      fontFamily: fonts.cm,
      fontWeight: 'bold',
    },
    h3Headline: {
      fontSize: 28,
      fontFamily: fonts.ssp,
      fontWeight: 'bold',
    },
    h4Headline: {
      fontSize: 20,
      fontFamily: fonts.cm,
      fontWeight: 'bold',
    },
  });
}

export default Headline;
