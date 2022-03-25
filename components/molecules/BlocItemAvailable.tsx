import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../atoms/Text';
import {colors, fonts, typo} from '../../assets/style';
import Device from 'react-native-device-detection';
import {useNavigation} from '@react-navigation/native';

export const BlocItemAvailable = ({
  item: {id, title, subtitle, color, image, icon: IconComp},
}: any) => {
  const navigation = useNavigation();

  const [stylesTablet, setStyles] = useState<any>(makeStylesTablet());

  Dimensions.addEventListener('change', e => {
    setStyles(makeStylesTablet());
  });

  return (
    <View style={[Device.isTablet ? stylesTablet.root : styles.root]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Activity', {id, backScreen: 'Home'})
        }>
        <ImageBackground source={{uri: image}} style={styles.image}>
          <View style={[{backgroundColor: color}, styles.box]}>
            {IconComp && <View style={styles.icon}>{IconComp}</View>}
            <Text style={styles.h3}>{title}</Text>
            {/*{subtitle ? <Text style={styles.desc}>{subtitle}</Text> : null}*/}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    marginTop: 10,
    borderRadius: 8,
    height: 140,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    height: 140,
  },
  box: {
    height: 140,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 18,
  },
  desc: {
    textAlign: 'left',
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: fonts.ssp,
  },
  h3: {
    textAlign: 'left',
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: fonts.ssp,
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

export default BlocItemAvailable;
