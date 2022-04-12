import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {LogoIcon, CloseIcon, BackIcon} from '../';
import {useNavigation} from '@react-navigation/native';

export const TabBar = ({
  back = false,
  backScreen = null,
  backParams = {},
  close = false,
  onClose = () => {},
  colorLogo,
  colorBack,
  styleClose,
  styleBack,
}: TabBarInterface) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.tabBarHeight,
        styles.centerView,
        styles.relativeView,
        close && {justifyContent: 'flex-end'},
        close && back && {justifyContent: 'space-between'},
      ]}>
      {back && (
        <TouchableOpacity
          onPress={() => {
            backScreen
              ? navigation.navigate(backScreen, backParams)
              : navigation.goBack();
          }}
          style={[styles.pressBack, styleBack]}>
          <View style={{paddingLeft: 40, paddingRight: 20}}>
            <BackIcon color={colorBack} />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.logo}>
        <LogoIcon color={colorLogo} />
      </View>
      {close && (
        <TouchableOpacity
          onPress={onClose}
          style={[styles.pressClose, styleClose]}>
          <View style={{paddingLeft: 20, paddingRight: 40}}>
            <CloseIcon />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface TabBarInterface {
  back?: boolean;
  close?: boolean;
  onPress?: any;
  onClose?: any;
  backScreen?: string | null;
  backParams?: Object;
  colorLogo?: string;
  colorBack?: string;
  styleBack?: any;
  styleClose?: any;
}

const styles = StyleSheet.create({
  tabBarHeight: {
    height: 64,
    marginBottom: 10,
    flexDirection: 'row',
  },
  centerView: {
    alignItems: 'center',
  },
  relativeView: {
    position: 'relative',
  },
  logo: {
    zIndex: -1,
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    marginLeft: 10,
  },
  pressBack: {
    //backgroundColor: 'red',
    paddingTop: 20,
    paddingBottom: 20,
  },
  pressClose: {
    //backgroundColor: 'red',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default TabBar;
