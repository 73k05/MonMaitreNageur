import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Device from 'react-native-device-detection';
import {Text, Chip, BicepsIcon} from '../../components';
import {colors} from '../../assets/style';

export const InfoMuscle = ({muscles}: any) => {
  return (
    <View style={[styles.container, styles.paddingView]}>
      <View style={styles.triangle} />
      <View style={styles.triangle2} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {muscles.map((m: any, i: string) => (
          <Chip key={i} mode="flat" color="tertiary">
            {m.name}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    position: 'relative',
    backgroundColor: 'white',
    minHeight: 74,
  },
  paddingView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  textStyle: {
    marginLeft: 7,
  },
  alignView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  triangle: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: -10,
    right: 60,
    alignItems: 'center',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: 'white',
  },
  triangle2: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: -10,
    right: 61,
    alignItems: 'center',
    borderLeftWidth: 9,
    borderLeftColor: 'transparent',
    borderRightWidth: 9,
    borderRightColor: 'transparent',
    borderBottomWidth: 9,
    borderBottomColor: 'white',
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    triangle: {
      width: 10,
      height: 10,
      position: 'absolute',
      top: -10,
      right: '15%',
      alignItems: 'center',
      borderLeftWidth: 10,
      borderLeftColor: 'transparent',
      borderRightWidth: 10,
      borderRightColor: 'transparent',
      borderBottomWidth: 10,
      borderBottomColor: 'white',
    },
    triangle2: {
      width: 10,
      height: 10,
      position: 'absolute',
      top: -10,
      right: '15%',
      alignItems: 'center',
      borderLeftWidth: 9,
      borderLeftColor: 'transparent',
      borderRightWidth: 9,
      borderRightColor: 'transparent',
      borderBottomWidth: 9,
      borderBottomColor: 'white',
    },
  });
}

export default InfoMuscle;
