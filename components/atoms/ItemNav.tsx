import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, ArrowIcon} from '../../components';
import {colors} from '../../assets/style';

export const ItemNav = ({
  onPress,
  text = 'Mes informations personnelles',
  fontColor = 'tertiary',
}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.alignView}>
        <Text mode="body" fontColor={fontColor}>
          {text}
        </Text>
        <ArrowIcon />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    width: '100%',
    justifyContent: 'center',
    // height: 60,
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
    padding: 20,
    marginBottom: 10,
  },
  alignView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ItemNav;
