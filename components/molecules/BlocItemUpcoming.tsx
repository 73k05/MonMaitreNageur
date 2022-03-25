import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, Dimensions} from 'react-native';
import Device from 'react-native-device-detection';
import {Text} from '../atoms/Text';
import {colors, fonts, typo} from '../../assets/style';

export const BlocItemUpcoming = ({item: {title, image, availableAt}}: any) => {
  const [stylesTablet, setStyles] = useState<any>(makeStylesTablet());

  Dimensions.addEventListener('change', e => {
    setStyles(makeStylesTablet());
  });

  return (
    <View style={[Device.isTablet ? stylesTablet.root : styles.root]}>
      <ImageBackground source={{uri: image}} style={styles.image}>
        <View style={styles.box}>
          <Text style={typo.h3}>{title}</Text>
          <View>
            <Text style={styles.title}>Date de sortie :</Text>
            <Text style={styles.date}>{availableAt}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  box: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 28,
    paddingBottom: 24,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.black80,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.ssp,
  },
  date: {
    marginTop: 2,
    color: colors.white,
    fontSize: 17,
    fontFamily: fonts.cm,
  },
});

const makeStylesTablet = () => {
  return StyleSheet.create({
    root: {
      width: Dimensions.get('screen').width / 2 - 30,
      marginTop: 10,
      marginRight: 10,
    },
  });
};

export default BlocItemUpcoming;
