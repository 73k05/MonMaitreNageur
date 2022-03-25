import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors} from '../../assets/style';
import {FAQIcon} from '../icons/FAQIcon';
import {TabBar} from '../molecules/TabBar';
import {Headline} from '../atoms/Headline';
import {useNavigation} from '@react-navigation/native';

export const DefaultLayout = ({
  bg = colors.greyL,
  tabBar = true,
  padding = true,
  title = false,
  faq = false,
  back = false,
  close = false,
  backScreen = null,
  backParams = {},
  onClose,
  children,
  colorLogo,
  imageBackground = false,
  src,
  styleBack,
  styleClose,
}: {
  bg?: string;
  tabBar?: boolean;
  title?: string | false;
  style?: Object;
  padding?: boolean;
  faq?: boolean;
  back?: boolean;
  close?: boolean;
  backParams?: Object;
  backScreen?: null | string;
  onClose?: Function;
  children: React.ReactNode;
  imageBackground?: boolean;
  src?: Function;
  colorLogo?: string;
  styleBack?: Object;
  styleClose?: Object;
}) => {
  const navigation = useNavigation();

  return imageBackground ? (
    <View style={styles.root}>
      <ImageBackground source={src} style={styles.image}>
        {tabBar && (
          <View style={{marginTop: 30}}>
            <TabBar
              backScreen={backScreen}
              backParams={backParams}
              back={back}
              onClose={onClose}
              close={close}
              colorLogo={colorLogo}
              styleBack={styleBack}
              styleClose={styleClose}
            />
          </View>
        )}
        <View
          style={[styles.container, padding && styles.containerWithPadding]}>
          {children}
        </View>
      </ImageBackground>
    </View>
  ) : (
    <SafeAreaView
      style={[
        styles.root,
        {
          backgroundColor: bg,
        },
      ]}>
      {tabBar && (
        <TabBar
          backScreen={backScreen}
          backParams={backParams}
          back={back}
          onClose={onClose}
          close={close}
          colorLogo={colorLogo}
          styleBack={styleBack}
          styleClose={styleClose}
        />
      )}
      {title && (
        <View style={styles.title}>
          <Headline mode="h1" divider>
            {title}
          </Headline>
          {faq ? (
            <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
              <FAQIcon />
            </TouchableOpacity>
          ) : null}
        </View>
      )}
      <View style={[styles.container, padding && styles.containerWithPadding]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  containerWithPadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default DefaultLayout;
