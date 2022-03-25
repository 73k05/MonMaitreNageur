import React, {useState} from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Divider} from 'react-native-paper';
import {Text} from '../../components';
import {colors} from '../../assets/style';
import {sessionIntensity} from '../../utils/trad';

export const ListItemSession = ({
  nameSeance,
  intensity,
  time,
  equipment,
  src,
  intensityIcon,
  timerIcon,
  equipmentIcon,
  sessionEnd,
  disabled,
  child,
}: any) => {
  return (
    <View style={[disabled && {opacity: 0.3}, styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: src}} style={styles.imgStyle} />
        {sessionEnd ? <Divider style={styles.dividerStyle} /> : null}
        <Text
          style={{marginLeft: 10}}
          mode="big"
          fontColor="tertiary"
          weight="bold">
          {nameSeance}
        </Text>
      </View>
      <View style={styles.alignViewGroupIcon}>
        {intensity && (
          <View style={styles.alignViewIcon}>
            {intensityIcon}
            <Text fontColor="secondary">{sessionIntensity(intensity)}</Text>
          </View>
        )}
        <View style={styles.alignViewIcon}>
          {timerIcon}
          <Text fontColor="secondary">{(time / 60).toFixed(0)} min</Text>
        </View>
        <View style={styles.alignViewIcon}>
          {equipmentIcon}
          <Text fontColor="secondary">{equipment ? 'Avec' : 'Sans'}</Text>
        </View>
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
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#002E72',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 4,
    justifyContent: 'space-between',
  },
  contentText: {
    paddingLeft: 10,
  },
  imgStyle: {
    borderRadius: 4,
    width: 70,
    height: 52,
  },
  alignViewGroupIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignViewIcon: {
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 8,
  },
  dividerStyle: {
    borderWidth: 2,
    width: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: 8,
    borderColor: colors.pinkD,
  },
});

export default ListItemSession;
