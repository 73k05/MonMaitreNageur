import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from '../../components';
import {colors} from '../../assets/style';

export const ListItemAccessories = ({
  accessoryName,
  numberAccessories,
  src,
  onPress,
}: any) => {
  const maxlimit = 32;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: src}} style={styles.imgStyle} />
          <View style={styles.containerText}>
            <Text
              style={styles.widthText}
              mode="big"
              fontColor="tertiary"
              weight="bold">
              {{accessoryName}.length > maxlimit
                ? {accessoryName}.substring(0, maxlimit - 3) + '...'
                : accessoryName}
            </Text>
          </View>
        </View>
        {numberAccessories > 0 && (
          <Text
            style={{marginRight: 10}}
            fontColor="secondary"
            mode="big"
            weight="bold">
            {`(x${numberAccessories})`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
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
    //width: '100%',
  },
  contentText: {
    paddingLeft: 10,
  },
  imgStyle: {
    borderRadius: 4,
    width: 70,
    height: 52,
  },
  containerText: {
    flexDirection: 'row',
  },
  widthText: {
    marginLeft: 10,
    flex: 1,
  },
});

export default ListItemAccessories;
