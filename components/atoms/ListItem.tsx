import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, ArrowDownIcon, ArrowUpIcon} from '../';

export const ListItem = ({onPress, open, title}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.alignView}>
        <Text style={styles.textStyle} mode="small" fontColor="tertiary">
          {title}
        </Text>
        {open ? (
          <View style={styles.marginIcon}>
            <ArrowUpIcon />
          </View>
        ) : (
          <View style={styles.marginIcon}>
            <ArrowDownIcon />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
  },
  alignView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginIcon: {
    marginTop: 10,
    // marginLeft: 4,
  },
  textStyle: {
    paddingRight: 10,
  },
});

export default ListItem;
