import React from 'react';
import {StyleSheet, View, FlatList, Linking, Dimensions} from 'react-native';
import {
  ConnectedLayout,
  Text,
  ListItemAccessories,
  AppStatusBar,
} from '../components';
import Screen from '../hocs/Screen';

export const AccessoriesScreen = Screen(
  ({
    title = 'titre du compos parent',
    activity = null,
    accessories = [],
  }: any) => {
    const desc =
      title === 'Bien vous installer'
        ? 'Afin de pratiquer vos activités aquatiques dans les meilleures conditions, voici quelques conseils préalables :\n\n' +
          '1- Vérifiez si votre smartphone / tablette est étanche ou non.\n' +
          '2- Si votre appareil craint l’eau, il est impératif de le protéger avec une coque étanche et antichoc.\n' +
          '3- Installez votre appareil sur le rebord du bassin, idéalement sur un support multi-angles, pour éviter les reflets. \n' +
          `${
            activity?.title === 'Aquagym Prénatale' || !activity
              ? '4- Pour votre confort, vous pouvez aussi vous doter d’écouteurs bluetooth étanches… Ou au contraire, miser sur une une enceinte à poser sur le bord du bassin.'
              : '4- Pour votre confort, vous pouvez aussi vous procurer une enceinte à poser sur le bord du bassin.'
          }\n\n` +
          'En cliquant sur les boutons ci-dessous, vous pourrez découvrir les produits que nous avons nous-même testé et que nous vous recommandons.\n' +
          'Il s’agit là de propositions. Libre à vous de choisir les accessoires dont vous avez besoin. Mais attention à ne pas faire tomber vos appareils dans l’eau ;)'
        : !activity
        ? 'Toute l’équipe de Mon Maître Nageur vous propose une sélection d’équipements dédiés à la pratique des activités aquatiques.\n\n' +
          'Dans chaque activité, le coach indique les équipements et le nombre utile pour réaliser l’activité.'
        : `Vous trouverez ci-dessous la sélection du matériel « de base », nécessaire pour pratiquer au mieux ${
            !activity ? 'vos activités.' : `l’activité ${activity?.title}.`
          }\n\n` +
          'En cliquant sur les boutons, vous pourrez découvrir les produits que nous avons nous-même testé et que nous vous recommandons.\n\n' +
          'Cette liste n’est bien sûr pas exhaustive, nous vous encourageons à la compléter selon vos envies et besoins, et selon votre piscine (intérieure ou extérieure, chauffée ou peu chauffée, etc.)' +
          `${
            activity?.title === 'Bébés Nageurs'
              ? '\n\nLe tee-shirt et la casquette anti-UV sont essentiels si vous êtes au soleil dans une piscine extérieure.'
              : ''
          }`;

    const handlePress = async (url: string) => {
      if (url) {
        await Linking.openURL(url);
      }
    };

    return (
      <ConnectedLayout back title={title}>
        <AppStatusBar transparent />
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{marginBottom: 20}}>
              <Text mode="body" fontColor="tertiary">
                {desc}
              </Text>
            </View>
          }
          data={accessories}
          renderItem={({item}: any) => {
            const content = JSON.parse(item.content);
            return (
              <ListItemAccessories
                onPress={async () => {
                  await handlePress(content?.url);
                }}
                accessoryName={content?.name}
                numberAccessories={content?.quantity}
                src={content?.image}
              />
            );
          }}
          keyExtractor={item => item.id}
        />
      </ConnectedLayout>
    );
  },
);
StyleSheet.create({
  root: {},
  imgStyle: {
    width: '100%',
    height: Dimensions.get('window').height / 4,
    borderRadius: 8,
    marginBottom: 30,
  },
});
export default AccessoriesScreen;
