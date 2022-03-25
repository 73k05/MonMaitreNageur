import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Headline} from '../../components';
import Device from 'react-native-device-detection';
import {fonts, colors} from '../../assets/style';

export interface BlocListInterface {
  title: string;
  items: BlocListItemInterface[];
  renderItem: any;
  style: object;
  headlineStyle: object;
  horizontal: boolean;
}

export interface BlocListItemInterface {
  image: string;
  navigate?: string;
}

export const BlocList = ({
  title,
  renderItem: Item,
  items,
  horizontal,
  style,
  headlineStyle,
}: BlocListInterface) => {
  return (
    <View style={[styles.root, style]}>
      <Headline mode="h2" style={[styles.headlineStyle, headlineStyle]}>
        {title}
      </Headline>
      <View style={horizontal ? styles.horizontal : null}>
        {Item &&
          items.map((item, i) => {
            return <Item item={item} key={i} />;
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
  image: {
    marginTop: 20,
    height: 193,
    resizeMode: 'cover',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  box: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 30,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },
  subtitle: {
    textAlign: 'left',
    color: colors.white,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: fonts.ssp,
  },
  headlineStyle: {
    marginBottom: 20,
  },
});

if (Device.isTablet) {
  Object.assign(styles, {
    image: {
      marginTop: 20,
      maxWidth: '100%',
      height: 419,
      resizeMode: 'cover',
      justifyContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',
    },
    horizontal: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
}

export default BlocList;
