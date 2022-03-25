import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {palettes} from '../assets/style';

import Screen from '../hocs/Screen';

import {
  ConnectedLayout,
  Text,
  SadIllustration,
  Headline,
  Button,
  AppStatusBar,
} from '../components';
import {useAuth} from '../Auth';

export const DeleteAccountScreen = Screen(() => {
  const {signOut} = useAuth();
  const handleLogout = () => {
    signOut();
  };

  return (
    <ConnectedLayout tabs={true} bg={palettes.secondary.bg}>
      <AppStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.alignView}>
          <SadIllustration />
        </View>
        <View>
          <Headline center mode="h2" fontColor="white">
            Nous sommes tristes{'\n'}de vous perdre !
          </Headline>
          <Text center style={styles.textStyle} mode="small">
            {'\n'}
            Suite à votre demande, votre compte et vos données ont été
            supprimées.{'\n'} Toute l'équipe espère vous revoir prochainement !
            ;)
            {'\n'}
            {'\n'}À bientôt !
          </Text>
        </View>
        <View style={styles.contentButton}>
          <Button mode="contained" onPress={handleLogout}>
            Fermer
          </Button>
        </View>
      </ScrollView>
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  alignView: {
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 8,
  },
  contentButton: {
    paddingTop: 30,
    paddingBottom: 20,
  },
});

export default DeleteAccountScreen;
