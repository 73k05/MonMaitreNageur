import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItemsNav, Text, Button, AppStatusBar} from '../components';
import Screen from '../hocs/Screen';
import {ConnectedLayout} from '../components';
import {useAuth} from '../Auth';
import {appVersion} from '../utils';

export const AccountScreen = Screen(() => {
  const {user, signOut} = useAuth();

  const handleLogout = () => {
    signOut();
  };

  return (
    <ConnectedLayout tabs={true} title={user?.firstname} faq>
      <AppStatusBar transparent />
      <ListItemsNav
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <View style={{paddingVertical: 20}}>
            <Button mode="text" color="secondaryDark" onPress={handleLogout}>
              Me déconnecter
            </Button>
            <Text style={styles.textCenter} fontColor="tertiary" mode="little">
              {appVersion()}
            </Text>
          </View>
        }
      />
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  marginLessView: {
    marginTop: '-10%',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default AccountScreen;
