import React, {useState} from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Headline, Text} from '../';

export interface CardCoachInterface {
  id?: string;
  color: string;
  mode?: 'default' | 'mini' | 'verysmall';
  firstname?: string;
  label?: string;
  image: string;
  style?: Object;
}

export const CardCoach = ({
  color,
  mode = 'default',
  firstname,
  label,
  image,
  style = {},
}: CardCoachInterface) => {
  const [stylesTablet, setStyles] = useState<any>(makeStylesTablet());

  Dimensions.addEventListener('change', e => {
    setStyles(makeStylesTablet());
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: color},
        style,
        Device.isTablet ? stylesTablet[`${mode}Card`] : styles[`${mode}Card`],
      ]}>
      {mode === 'default' && (
        <View style={styles.titleheight}>
          <Headline mode="h3" fontColor="white">
            {firstname}
          </Headline>
          <Text mode="big" fontColor="white" style={styles.textHeight}>
            {label}
          </Text>
        </View>
      )}
      <Image
        style={styles[`${mode}Img`]}
        width={
          (mode === 'default' && 140) ||
          (mode === 'mini' && 81) ||
          (mode === 'verysmall' && 71) ||
          140
        }
        height={
          (mode === 'default' && 140) ||
          (mode === 'mini' && 81) ||
          (mode === 'verysmall' && 71) ||
          140
        }
        source={{uri: image}}
      />
    </View>
  );
};

const styles = StyleSheet.create<any>({
  root: {},
  container: {
    paddingLeft: 30,
    position: 'relative',
  },
  titleheight: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  textHeight: {
    marginTop: '-1%',
  },

  /**
   * Mode = default
   */
  defaultCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '100%',
    borderRadius: 8,
    height: 100,
    paddingRight: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  defaultImg: {
    position: 'absolute',
    height: 140,
    resizeMode: 'contain',
    bottom: 0,
    right: 0,
  },

  /**
   * Mode = mini
   */
  miniCard: {
    width: 68,
    height: 68,
    borderRadius: 8,
    marginTop: 30,
    marginBottom: 20,
    marginRight: 10,
  },
  miniImg: {
    position: 'absolute',
    left: '-7%',
    right: 0,
    width: 81,
    height: 81,
    resizeMode: 'contain',
    bottom: 0,
  },

  /**
   * Mode = verysmall
   */
  verysmallCard: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginTop: 30,
  },
  verysmallImg: {
    position: 'absolute',
    left: '-7%',
    right: 0,
    width: 71,
    height: 71,
    resizeMode: 'contain',
    bottom: 0,
  },
});

const makeStylesTablet = () => {
  return StyleSheet.create({
    /**
     * Mode = default
     */
    defaultCard: {
      maxWidth: '100%',
      width: Dimensions.get('screen').width / 2 - 40,
      borderRadius: 8,
      height: 110,
      paddingRight: 40,
      marginTop: 30,
      marginBottom: 20,
      marginRight: 5,
      marginLeft: 5,
    },

    /**
     * Mode = mini
     */
    miniCard: {
      width: 68,
      height: 68,
      borderRadius: 8,
      marginTop: 30,
      marginBottom: 20,
      marginRight: 10,
    },
    miniImg: {
      position: 'absolute',
      left: '-7%',
      right: 0,
      width: 81,
      height: 81,
      resizeMode: 'contain',
      bottom: 0,
    },

    /**
     * Mode = verysmall
     */
    verysmallCard: {
      width: 60,
      height: 60,
      borderRadius: 8,
      marginTop: 30,
    },
    verysmallImg: {
      position: 'absolute',
      left: '-7%',
      right: 0,
      width: 71,
      height: 71,
      resizeMode: 'contain',
      bottom: 0,
    },
  });
};

export default CardCoach;
