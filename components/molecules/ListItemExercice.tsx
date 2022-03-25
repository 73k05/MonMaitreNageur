import React from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Text} from '../atoms/Text';

export const ListItemExercice = ({nameExercice, image, descExercice}: any) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.imgStyle} />
      <View style={styles.contentText}>
        <Text mode="body" fontColor="tertiary" weight="bold">
          {nameExercice}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contentText: {
    paddingLeft: 10,
  },
  imgStyle: {
    borderRadius: 4,
    width: 70,
    height: 52,
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    // imgStyle: {
    //   borderRadius: 4,
    //   width: 140,
    //   height: 104,
    // },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      width: '50%',
    },
  });
}

export default ListItemExercice;
