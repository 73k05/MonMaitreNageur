import React, {useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, ValidationIcon, ErrorIcon} from '../../components';
import * as ScreenOrientation from 'expo-screen-orientation';

export const OverlayExercise = ({onPressYes, onPressNo}: any) => {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  });

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text center weight="bold" mode="body">
          Votre enfant a-t-il réussi cet exercice ?
        </Text>
        <View style={[styles.paddingView, styles.alignButtonView]}>
          <View style={styles.marginIconViewRight}>
            <TouchableOpacity onPress={onPressYes}>
              <ValidationIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.marginIconViewLeft}>
            <TouchableOpacity onPress={onPressNo}>
              <ErrorIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: 'rgba(0, 46, 114, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingView: {
    paddingTop: 30,
  },
  alignButtonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginButtonViewRight: {
    marginRight: 5,
  },
  marginButtonViewLeft: {
    marginLeft: 5,
  },
  marginIconViewRight: {
    marginRight: 25,
  },
  marginIconViewLeft: {
    marginLeft: 25,
  },
});

export default OverlayExercise;
