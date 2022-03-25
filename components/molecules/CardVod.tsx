import React from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import {colors} from '../../assets/style';

export const CardVod = ({src, label, onPress}: any) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.alignView}>
          <Image source={src} style={styles.imgStyle} />
          <Text
            mode="body"
            weight="bold"
            fontColor="tertiary"
            center
            style={styles.textStyle}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    marginTop: 20,
    minHeight: 60,
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#002E72',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 4,
    alignSelf: 'center',
  },
  textStyle: {
    padding: 7,
    width: 120,
    marginBottom: 0,
  },
  imgStyle: {
    marginLeft: 2,
    width: 74,
    height: 52,
  },
  alignView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    textStyle: {
      padding: 7,
      width: 140,
      marginBottom: 0,
    },
  });
}

export default CardVod;
