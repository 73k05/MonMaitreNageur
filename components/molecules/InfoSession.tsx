import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {
  Text,
  TimerIcon,
  BicepsIcon,
  Chip,
  EquipmentIcon,
} from '../../components';
import {colors} from '../../assets/style';

export const InfoSession = ({
  intensity,
  time,
  equipment,
  intensityIcon,
  onPress,
  hasMuscleGroups,
}: any) => {
  return (
    <View style={[styles.container, styles.paddingView]}>
      {hasMuscleGroups && (
        <View style={[styles.contentInfo]}>
          {intensityIcon}
          <Text
            style={[styles.marginBText, styles.paddingTopText]}
            weight="bold"
            mode="body">
            Intensité
          </Text>
          <Text style={styles.marginTText}>{intensity}</Text>
        </View>
      )}
      {hasMuscleGroups && <Divider style={styles.dividerRotate} />}
      <View style={[styles.contentInfo]}>
        <TimerIcon />
        <Text
          style={[styles.marginBText, styles.paddingTopText]}
          weight="bold"
          mode="body">
          Durée
        </Text>
        <Text style={styles.marginTText}>{time}</Text>
      </View>
      <Divider style={styles.dividerRotate} />
      {hasMuscleGroups ? (
        <TouchableOpacity onPress={onPress} style={[styles.contentInfo]}>
          <BicepsIcon />
          <Text
            style={[styles.marginBText, styles.paddingTopText]}
            center
            weight="bold"
            mode="body">
            Groupe {'\n'}
            Musculaire
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.contentInfo}>
          <EquipmentIcon />
          <Text
            style={[styles.marginBText, styles.paddingTopText]}
            center
            weight="bold"
            mode="body">
            Équipement
          </Text>
          <Text style={styles.marginTText}>{equipment}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.blueL,
    minHeight: 92,
  },
  paddingView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14,
  },
  contentInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginBText: {
    marginBottom: 0,
  },
  marginTText: {
    marginTop: 0,
  },
  paddingTopText: {
    paddingTop: 4,
  },
  dividerRotate: {
    opacity: 0.3,
    transform: [{rotate: '90deg'}],
    marginTop: 35,
    width: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default InfoSession;
