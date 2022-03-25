import React, {useState} from 'react';
import Device from 'react-native-device-detection';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {typo, colors, fonts} from '../../assets/style';

export const CardActivity = ({
  icon: IconComp,
  bgURL,
  titre,
  desc,
  color,
}: any) => {
  const [stylesTablet, setStyles] = useState<any>(makeStylesTablet());

  return (
    <View style={[Device.isTablet ? stylesTablet.root : styles.root]}>
      <ImageBackground source={{uri: bgURL}} style={styles.image}>
        <View style={[{backgroundColor: color}, styles.box]}>
          {IconComp && <View style={styles.icon}>{IconComp}</View>}
          <Text style={typo.h3}>{titre}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  box: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});

const makeStylesTablet = () => {
  return StyleSheet.create({
    root: {
      maxWidth: '100%',
      width: Dimensions.get('screen').width / 2 - 30,
      marginTop: 10,
      borderRadius: 8,
      marginRight: 10,
      maxHeight: '100%',
    },
  });
};

export default CardActivity;
