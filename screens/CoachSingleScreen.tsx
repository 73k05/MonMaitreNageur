import React, {useCallback} from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {
  ConnectedLayout,
  Headline,
  Text,
  CardActivity,
  ChipCoach,
  AppStatusBar,
} from '../components';

import {activityColorByIterator, colors} from '../assets/style';
import {useNavigation, useRoute} from '@react-navigation/native';
import Screen from '../hocs/Screen';
import {gql} from '@apollo/client';
import useMmnQuery from '../hooks/useMmnQuery';
import {SvgUri} from 'react-native-svg';

export const CoachSingleScreen = Screen(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, color: coachColor, backScreen, backParams}: any = route.params;
  const {data, error} = useMmnQuery(
    gql`
    {
      coach(id: "${id}") {
        success
        errorCode
        coach {
          id
          firstname
          label
          image
          description
          activities {id title image description availableAt icon}
        }
      }
    }
  `,
  );

  const coach = data?.coach?.coach;
  const activities = coach?.activities || [];

  const back = useCallback(() => {
    backScreen
      ? navigation.navigate(backScreen, {
          backParams: {...backParams, color: coachColor},
        })
      : navigation.navigate('Coachs');
  }, [backScreen, backParams, navigation, coachColor]);

  return (
    <ConnectedLayout tabBar={false} padding={false}>
      <AppStatusBar />
      <ChipCoach
        color={coachColor}
        bgPink={coachColor === colors.pinkD}
        image={coach?.image}
        firstname={coach?.firstname}
        label={coach?.label}
        onPress={back}
      />
      <FlatList
        style={styles.paddingView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={[styles.relativeView, styles.textStyle]}>
              <Text fontColor="tertiary" mode="body">
                {coach?.description}
              </Text>
            </View>
            {activities.length > 0 && (
              <View style={[styles.titleheight, styles.relativeView]}>
                <Headline mode="h2">
                  {activities.length > 1
                    ? 'Activités proposées'
                    : 'Activité proposée'}
                </Headline>
              </View>
            )}
          </>
        }
        data={activities}
        renderItem={({item, index}: any) => {
          const color = activityColorByIterator(index);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Activity', {
                  id: item.id,
                  backScreen: 'Coach',
                  backParams: {id, color: coachColor},
                });
              }}>
              <CardActivity
                bgURL={item.image}
                icon={<SvgUri uri={item.icon} />}
                titre={item.title}
                color={color}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        key={id}
        numColumns={Device.isTablet ? 2 : 1}
      />
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  container: {
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.greyL,
    height: '100%',
  },
  titleheight: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  paddingView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  relativeView: {
    position: 'relative',
  },
  textStyle: {
    paddingTop: 20,
  },
});

export default CoachSingleScreen;
