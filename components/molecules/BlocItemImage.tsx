import React from 'react';
import Device from 'react-native-device-detection';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../assets/style';

export const BlocItemImage = ({item: {navigate, image}}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
        <Image source={image} style={styles.image} resizeMode="cover" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    borderRadius: 8,
    width: Dimensions.get('screen').width,
    maxWidth: '100%',
    height: Dimensions.get('screen').height / 4,
    backgroundColor: colors.greyD,
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    image: {
      maxWidth: '100%',
      height: 410,
      minHeight: 410,
      justifyContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',
    },
  });
}

export default BlocItemImage;
