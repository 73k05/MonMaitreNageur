import React from 'react';
import {StyleSheet, View, SectionList, Linking} from 'react-native';
import {ItemNav, Headline} from '../../components';
import {useNavigation} from '@react-navigation/native';

export const ListItemsNav = ({style = {}, ...props}: any) => {
  const navigation = useNavigation();

  const DATA = [
    {
      title: 'Mon profil',
      data: [
        {
          text: 'Mes informations personnelles',
          screen: 'InfoPerso',
        },
        {
          text: 'Mon mot de passe',
          screen: 'Password',
        },
        // {
        //   text: 'Mon abonnement',
        //   screen: 'Subscription',
        // },
        {
          text: 'Mes badges & diplômes',
          screen: 'Succès',
        },
      ],
    },
    {
      title: 'Mon Maître Nageur',
      data: [
        {
          text: 'À propos',
          screen: 'About',
        },
        {
          text: 'Nous suivre',
          screen: 'Follow',
        },
        {
          text: 'Nous contacter',
          screen: 'Contact',
        },
        {
          text: 'CGU / Données personnelles',
          onPress: async () =>
            await Linking.openURL(
              'https://monmaitrenageur.io/docs/conditions-generales-utilisation.pdf',
            ),
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <ItemNav
            disabled
            fontColor="tertiary"
            text={item.text}
            onPress={() => {
              if (item.screen) {
                navigation.navigate(item.screen);
              } else if (item.onPress) {
                item.onPress();
              }
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <Headline mode="h2" style={styles.paddingTitle}>
            {title}
          </Headline>
        )}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    // flex: 1,
  },
  paddingTitle: {
    paddingBottom: 20,
    paddingTop: 40,
  },
});

export default ListItemsNav;
