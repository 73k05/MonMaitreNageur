import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text, Headline} from '../atoms';
import {colors} from '../../assets/style';
import {useNavigation} from '@react-navigation/native';

export const BeforeStarting = ({item}: any) => {
  const {id, name, thumbnail, disabled, order} = item;
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => navigation.navigate('BeforeStartingContent', {id})}>
        <View style={[disabled && {opacity: 0.3}, styles.container]}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}>
            <Image source={{uri: thumbnail}} style={styles.imgStyle} />
            <Text
              style={{marginLeft: 10}}
              mode="big"
              fontColor="tertiary"
              weight="bold">
              {name}
            </Text>
          </View>
          <View style={{position: 'absolute', right: 10}}>
            <Headline mode="number" fontColor="white">
              {order + 1}
            </Headline>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.greyL,
    borderRadius: 4,
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
});

export default BeforeStarting;
