import React from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, FlatList, View, Linking} from 'react-native';
import {
  ConnectedLayout,
  CardSocial,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  LinkedInIcon,
  AppStatusBar,
} from '../components';
import Screen from '../hocs/Screen';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    socialName: 'Sur Facebook',
    socialLink: '@monmaitrenageur',
    color: 'facebook',
    icon: <FacebookIcon />,
    onPress: async () =>
      await Linking.openURL(
        'https://www.facebook.com/Mon-Ma%C3%AEtre-Nageur-105827661727336',
      ),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    socialName: 'Sur Instagram',
    socialLink: '@monmaitrenageur',
    color: 'instagram',
    icon: <InstagramIcon />,
    onPress: async () =>
      await Linking.openURL('https://www.instagram.com/monmaitrenageur/'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    socialName: 'Sur YouTube',
    socialLink: 'Mon Maître Nageur',
    color: 'youtube',
    icon: <YouTubeIcon />,
    onPress: async () =>
      await Linking.openURL(
        'https://www.youtube.com/channel/UC03naQfN8VlAeoLUyMx_yUg',
      ),
  },
  {
    id: '58694a0f-3da1-56gs-bd96-145571e29d72',
    socialName: 'Sur LinkedIn',
    socialLink: 'Mon Maître Nageur',
    color: 'linkedin',
    icon: <LinkedInIcon />,
    onPress: async () =>
      await Linking.openURL(
        'https://www.linkedin.com/showcase/mon-ma%C3%AEtre-nageur/',
      ),
  },
];

export const FollowScreen = Screen(({}) => {
  return (
    <ConnectedLayout title={'Nous suivre'} back={true}>
      <AppStatusBar transparent />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerFlatListStyle}
        data={DATA}
        renderItem={({item}: any) => (
          <View style={styles.flatListStyle}>
            <CardSocial
              onPress={item.onPress}
              socialName={item.socialName}
              socialLink={item.socialLink}
              color={item.color}
              icon={item.icon}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        numColumns={Device.isTablet ? 4 : 2}
      />
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  marginView: {
    marginTop: 40,
  },
  imgStyle: {
    marginTop: 20,
  },
  headlineStyle: {
    marginBottom: 20,
  },
  containerFlatListStyle: {
    paddingTop: 20,
  },
  flatListStyle: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 5,
    marginBottom: 5,
  },
});

export default FollowScreen;
