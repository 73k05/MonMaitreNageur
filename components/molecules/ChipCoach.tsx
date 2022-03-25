import React from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {BackIcon, Headline, Text} from '../../components';
import {colors} from '../../assets/style';

export const ChipCoach = ({
  color = 'secondary',
  image,
  firstname,
  label,
  onPress,
  bgPink,
}: any) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <TouchableOpacity onPress={onPress} style={styles.arrowIconStyle}>
        <BackIcon color={colors.white} />
      </TouchableOpacity>
      <View style={styles.contentContainerStyle}>
        <View style={styles.contentContainerCoach}>
          <View style={styles.titleheight}>
            <Headline
              mode="h1"
              divider
              fontColor="white"
              color={bgPink ? 'secondaryDark' : 'primary'} //Changer en fonction du fond de couleur des coachs
            >
              {firstname}
            </Headline>
            <Text mode="big" fontColor="white" style={styles.textHeight}>
              {label}
            </Text>
          </View>
          <Image
            style={styles.image}
            height={220}
            width={220}
            source={{uri: image}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    marginTop: -48,
    paddingTop: 38,
    height: 288,
    maxHeight: '100%',
    width: '100%',
  },
  arrowIconStyle: {
    paddingTop: 35,
    paddingLeft: 30,
  },
  image: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
  titleheight: {
    paddingTop: 45,
    paddingLeft: 30,
  },
  textHeight: {
    paddingTop: 6,
  },
  contentContainerCoach: {
    position: 'relative',
    height: 230,
    maxHeight: '100%',
    width: '100%',
  },
  contentContainerStyle: {
    marginTop: '5%',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    contentContainerStyle: {
      alignItems: 'center',
      width: '100%',
    },
    container: {
      marginTop: -24,
      paddingTop: 24,
      height: 258,
      maxHeight: '100%',
      width: '100%',
    },
    contentContainerCoach: {
      position: 'relative',
      height: 235,
      maxHeight: '100%',
      width: '50%',
    },
  });
}

export default ChipCoach;
