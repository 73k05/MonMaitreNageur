import React, {useEffect, useState} from 'react';
import {
  Text,
  ConnectedLayout,
  BlocList,
  BlocItemUpcoming,
  BlocItemAvailable,
  BlocItemImage,
  BeforeStarting,
  AppStatusBar,
} from '../components';
import Device from 'react-native-device-detection';
import Screen from '../hocs/Screen';
import {differenceInYears, parse} from 'date-fns';
import {StyleSheet, ScrollView, View} from 'react-native';
import {gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {activityColorByIterator, colors} from '../assets/style';
import {useNotification, useRouting} from '../hooks';
import {useAuth} from '../Auth';
import LoadingScreen from './LoadingScreen';
import useMmnLazyQuery from '../hooks/useMmnLazyQuery';
import {SvgUri} from 'react-native-svg';

const HOME = gql`
  {
    me {
      success
      errorCode
      me {
        firstname
        birthday
      }
    }
    beforeStartingPages {
      message
      errorCode
      newBadges {
        name
        level
      }
      beforeStartingPages {
        id
        createdAt
        updatedAt
        name
        thumbnail
        order
      }
    }
    availableActivities {
      success
      errorCode
      availableActivities {
        id
        title
        subtitle
        image
        icon
      }
    }
    upcomingActivities {
      success
      errorCode
      upcomingActivities {
        id
        title
        availableAt
        image
        icon
      }
    }
  }
`;

export const HomeScreen = Screen(() => {
  const notification = useNotification();
  notification.show();
  const navigation = useNavigation();
  const {goLogin, goScreenWithReset} = useRouting();
  const {user} = useAuth();
  const [availableActivities, setAvailableActivities] = useState([]);
  const [beforeStartingActivities, setBeforeStartingActivities] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const [getHomeData, {error, loading, data}] = useMmnLazyQuery(HOME, {
    fetchPolicy: 'no-cache',
  });

  const [isAdult, setIsAdult] = useState(true);

  useEffect(() => {
    if (
      data?.me?.me?.firstname === null ||
      data?.me?.me?.birthday === null ||
      data?.me?.me?.civility === null ||
      data?.me?.me?.formal === null
    ) {
      goScreenWithReset('ChatBot');
    }
  }, [data, goScreenWithReset]);

  useEffect(() => {
    getHomeData();
    return navigation.addListener('focus', async () => {
      getHomeData();
    });
  }, [navigation, getHomeData]);

  useEffect(() => {
    const birthdayDate = parse(
      data?.me?.me?.birthday,
      'dd/MM/yyyy',
      new Date(),
    );
    const dif = differenceInYears(new Date(), birthdayDate);
    setIsAdult(dif >= 18);

    if (data?.beforeStartingPages?.beforeStartingPages) {
      setBeforeStartingActivities(
        data?.beforeStartingPages?.beforeStartingPages.map(
          (a: any, i: number) => {
            return {
              ...a,
              navigate: '',
            };
          },
        ),
      );
    }
    if (data?.availableActivities?.availableActivities) {
      setAvailableActivities(
        data?.availableActivities?.availableActivities.map(
          (a: any, i: number) => {
            return {
              ...a,
              navigate: '',
              color: activityColorByIterator(i),
              icon: <SvgUri uri={a.icon} />,
            };
          },
        ),
      );
    }
    if (data?.upcomingActivities?.upcomingActivities) {
      setUpcomingActivities(
        data?.upcomingActivities?.upcomingActivities.map((a: any) => {
          return {
            ...a,
            navigate: '',
          };
        }),
      );
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) {
    return <LoadingScreen />;
  }

  const me = data?.me?.me;

  if (!me?.firstname) {
    return <LoadingScreen />;
  }

  return (
    <ConnectedLayout title={`Bonjour ${me?.firstname || ''}`} padding={false}>
      <AppStatusBar transparent />
      {!isAdult && (
        <View style={styles.notificationStyle}>
          <Text center style={styles.textStyle} mode="small">
            Attention, les activités doivent impérativement se faire avec la
            présence d’un adulte.
          </Text>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {(beforeStartingActivities || []).length > 0 && (
          <BlocList
            style={styles.blocListContainer}
            headlineStyle={{paddingLeft: 20}}
            title={'Avant de commencer'}
            items={beforeStartingActivities || []}
            renderItem={BeforeStarting}
          />
        )}
        <BlocList
          style={styles.containerWithPadding}
          title={'Nos coachs'}
          items={[
            {
              navigate: 'Coachs',
              image: Device.isTablet
                ? require('../assets/img/MMN-Photo_Famille-Coachs-2094x710.jpg')
                : require('../assets/img/MMN-Photo_Famille-Coachs-tablette-1704x710.jpg'),
            },
          ]}
          renderItem={BlocItemImage}
        />
        {(availableActivities || []).length > 0 && (
          <BlocList
            style={styles.containerWithPadding}
            title={'Les activités'}
            items={availableActivities || []}
            renderItem={BlocItemAvailable}
            horizontal
          />
        )}
        {(upcomingActivities || []).length > 0 && (
          <BlocList
            style={styles.containerWithPadding}
            title={'Prochainement'}
            renderItem={BlocItemUpcoming || []}
            items={upcomingActivities}
            horizontal
          />
        )}
      </ScrollView>
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  root: {},
  notificationStyle: {
    backgroundColor: colors.pinkD,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 18,
    paddingBottom: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  containerWithPadding: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  blocListContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    paddingTop: 30,
    paddingBottom: 20,
  },
});

export default HomeScreen;
