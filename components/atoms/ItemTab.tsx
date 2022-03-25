import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-paper';
import {Headline} from '../../components';
import {colors} from '../../assets/style';

export const ItemTab = ({onPress, titleTab, active = true}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Headline
        mode="h2"
        style={active ? styles.colorActive : styles.colorDisabled}>
        {titleTab}
      </Headline>
      {active || active === onPress ? <Divider style={styles.divider} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    alignSelf: 'flex-start',
  },
  divider: {
    marginTop: 6,
    borderWidth: 2,
    borderColor: colors.pinkD,
  },
  colorActive: {
    color: colors.blueD,
  },
  colorDisabled: {
    color: colors.greyD,
  },
});

export default ItemTab;
