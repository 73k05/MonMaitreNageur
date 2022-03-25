import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Device from 'react-native-device-detection';
import {Text, Chip, EquipmentIcon} from '../../components';
import {colors} from '../../assets/style';

export const InfoEquipment = ({equipments, child}: any) => {
  return (
    <View style={[styles.container, styles.paddingView]}>
      {!child ? (
        <View style={styles.alignView}>
          <EquipmentIcon color={colors.blueD} />
          <Text
            mode="body"
            weight="bold"
            fontColor="tertiary"
            style={styles.textStyle}>
            Équipement nécessaire
          </Text>
        </View>
      ) : null}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {equipments.map((m: any, i: string) => (
          <Chip key={i} mode="flat" color="white">
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
    backgroundColor: colors.greyD,
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
});

export default InfoEquipment;
