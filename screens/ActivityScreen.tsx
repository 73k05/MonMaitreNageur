import React, {useEffect, useRef, useState} from 'react';
import Device from 'react-native-device-detection';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {
  ConnectedLayout,
  CardCoach,
  Headline,
  Text,
  LowIntensityIcon,
  TimerIcon,
  EquipmentIcon,
  ListItemSession,
  PlayIcon,
  ModalDialog,
  BeforeStarting,
  BlocList,
  AppStatusBar,
  MediumIntensityIcon,
  HardIntensityIcon,
} from '../components';

import {coachColorByIterator, colors} from '../assets/style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {gql} from '@apollo/client';
import * as ScreenOrientation from 'expo-screen-orientation';
import {useRouting, useMmnQuery} from '../hooks';
import {getVideoUrlActivity} from '../utils';
import LoadingScreen from './LoadingScreen';
import {softAquagym} from '../utils/activity';

export const ActivityScreen = () => {
  const player = useRef(null);
  const navigation = useNavigation();
  const {goHome} = useRouting();
  const route = useRoute();
  const {id, backScreen, backParams}: any = route.params;
  const {data, loading, refetch} = useMmnQuery(gql`
    {
      activity(id: "${id}") {
        success
        errorCode
        activity {
          progressionType
          highestSessionOrderUnlocked
          nextSessionOrder
          id
          title
          image
          description
          coaches {firstname image id}
          sessions{id order name thumbnail difficulty duration withEquipment lastCompletedAt level}
        }
      }
      beforeStartingPages(activityId: "${id}") {
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
    }
  `);

  const [modalVisible, setModalVisible] = useState(false);
  const [beforeStartingActivities, setBeforeStartingActivities] = useState([]);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      refetch();
    });
  }, [navigation, refetch]);

  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    return navigation.addListener('blur', () => {
      player.current = null;
      setPlayVideo(false);
    });
  }, [navigation, player]);

  useEffect(() => {
    const beforeStartingPages =
      data?.beforeStartingPages?.beforeStartingPages || [];
    if (beforeStartingPages.length > 0) {
      setBeforeStartingActivities(
        beforeStartingPages.map((a: any) => {
          return {
            ...a,
            navigate: '',
          };
        }),
      );
    } else {
      setBeforeStartingActivities(beforeStartingPages);
    }
  }, [data]);

  const [stylesTablet, setStyles] = useState<any>(makeStylesTablet());

  Dimensions.addEventListener('change', () => {
    setStyles(makeStylesTablet());
  });

  if (loading) {
    return <LoadingScreen />;
  }

  const activity = data?.activity?.activity;
  const video = getVideoUrlActivity(activity);
  if (!activity?.title) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => goHome()}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Activité indisponible{'\n'}cliquez ici pour revenir en arrière
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  let previousLevel: any;

  return (
    <ConnectedLayout
      padding={false}
      back={true}
      backScreen={backScreen}
      backParams={backParams}
      title={activity?.title}>
      <AppStatusBar transparent />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.paddingContainer}>
          <View
            style={{
              borderRadius: 8,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPlayVideo(true);
                player.current = null;
                // navigation.navigate('Session', {id: '1e0b63'});
              }}
              style={playVideo ? null : styles.positionOverlayStyle}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000,
                }}>
                <PlayIcon color={colors.white} />
              </View>
            </TouchableOpacity>
            {playVideo ? (
              <VideoPlayer
                disableBack
                ignoreSilentSwitch={'ignore'}
                paused={false}
                source={{uri: video}}
                fullscreen={true}
                fullscreenAutorotate={true}
                fullscreenOrientation={'landscape'}
                controls={false}
                ref={player}
                onEnd={() => setPlayVideo(false)}
                style={{
                  borderRadius: 8,
                  width: '100%',
                  height: Device.isTablet ? 419 : 193,
                }}
                resizeMode={player ? 'cover' : 'contain'}
              />
            ) : (
              <View style={styles.containerImg}>
                <Image
                  source={{uri: activity?.image}}
                  style={
                    Device.isTablet
                      ? stylesTablet.imageVideo
                      : styles.imageVideo
                  }
                />
              </View>
            )}
          </View>
          <Text style={{marginTop: 20}} mode="small" fontColor="tertiary">
            {activity?.description}
          </Text>
        </View>

        {(beforeStartingActivities || []).length > 0 && (
          <BlocList
            style={styles.blocListContainer}
            headlineStyle={{paddingLeft: 20}}
            title={'Avant de commencer'}
            items={beforeStartingActivities || []}
            renderItem={BeforeStarting}
            horizontal={true}
          />
        )}

        <View style={styles.paddingContainer}>
          {activity?.coaches > 1 && (
            <Headline mode="h2" style={styles.headlineH2Style}>
              Les coachs
            </Headline>
          )}
          <View
            style={
              activity?.coaches > 1
                ? styles.flatListContainCoach
                : {marginBottom: 10, paddingTop: 30}
            }>
            {(activity?.coaches || []).map((item: any, i: number) => {
              const color = coachColorByIterator(i);
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigation.navigate('Coach', {
                      id: item.id,
                      color,
                      backScreen: 'Activity',
                      backParams: {id},
                    });
                  }}>
                  <CardCoach
                    mode={item.coaches > 1 ? 'mini' : 'default'}
                    color={color}
                    image={item.image}
                    firstname={(item.coaches = 1 && item.firstname)}
                    label={
                      (item.coaches =
                        1 &&
                        (item.firstname === 'Aurore' ? 'La coach' : 'Le coach'))
                    }
                    style={
                      item.coaches > 1 ? styles.cardCoach : {width: '100%'}
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <Headline mode="h2">Les séances</Headline>
          <View
            style={
              Device.isTablet
                ? stylesTablet.containerFlatlistSession
                : styles.containerFlatlistSession
            }>
            {(activity?.sessions || []).map((item: any, i: number) => {
              let LevelTitle = () => <></>;

              if (
                item?.level &&
                (!previousLevel || previousLevel !== item?.level)
              ) {
                LevelTitle = () => (
                  <Headline
                    mode="h4"
                    transform="uppercase"
                    fontColor="primary"
                    style={[
                      (item?.level === 2 || item?.level === 3) && {
                        paddingTop: 20,
                      },
                      {marginBottom: 14},
                    ]}>
                    Niveau {item?.level}
                  </Headline>
                );
              }

              let disabled = false;

              switch (activity.progressionType) {
                case 'UNIQUE_STEP':
                  disabled = activity?.nextSessionOrder !== item.order;
                  break;
                case 'PROGRESSIVE_STEP':
                  disabled = item.order > activity?.nextSessionOrder;
                  break;
              }

              if (item?.level) {
                previousLevel = item?.level;
              }

              return (
                <View key={i}>
                  <LevelTitle />
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      if (disabled) {
                        setModalVisible(true);
                      } else {
                        navigation.navigate('Session', {id: item.id});
                      }
                    }}>
                    <ListItemSession
                      nameSeance={item.name}
                      intensity={id === softAquagym ? 'LOW' : item.difficulty}
                      time={item.duration}
                      equipment={item.withEquipment}
                      src={item.thumbnail}
                      intensityIcon={
                        id === softAquagym ? (
                          <LowIntensityIcon color="#0070D2" />
                        ) : (
                          (item.difficulty === 'MEDIUM' && (
                            <MediumIntensityIcon color="#0070D2" />
                          )) ||
                          (item.difficulty === 'LOW' && (
                            <LowIntensityIcon color="#0070D2" />
                          )) ||
                          (item.difficulty === 'HARD' && (
                            <HardIntensityIcon color="#0070D2" />
                          ))
                        )
                      }
                      timerIcon={<TimerIcon color="#0070D2" />}
                      equipmentIcon={
                        <EquipmentIcon
                          color={item.withEquipment ? '#0070D2' : '#B1D3F1'}
                        />
                      }
                      sessionEnd={!!item.lastCompletedAt}
                      disabled={disabled}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {modalVisible && (
        <ModalDialog
          titleModal="Avertissement"
          descModal="Attention, notre équipe de coachs a planifié vos séances dans un ordre bien spécifique. Avant de lancer ce cours vous devez d’abord faire le précédent et le terminer !"
          action
          ariaLabel="J’ai compris"
          visible={modalVisible}
          onPress={() => {
            setModalVisible(false);
          }}
          onClose={() => setModalVisible(false)}
        />
      )}
    </ConnectedLayout>
  );
};
const styles = StyleSheet.create({
  root: {},
  contentContainer: {
    paddingBottom: 20,
  },
  cardCoach: {
    marginTop: 0,
    marginBottom: 20,
    marginRight: 20,
  },
  headlineH2Style: {
    marginTop: 30,
  },
  containerFlatlistSession: {
    paddingTop: 20,
  },
  flatListContainCoach: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
  positionOverlayStyle: {
    backgroundColor: colors.blueD80,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    borderRadius: 8,
    position: 'absolute',
  },
  containerImg: {
    width: '100%',
    borderRadius: 8,
  },
  imageVideo: {
    borderRadius: 8,
    width: '100%',
    height: 193,
  },
  blocListContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    paddingTop: 30,
    paddingBottom: 20,
  },
  paddingContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const makeStylesTablet = () => {
  return StyleSheet.create({
    containerFlatlistSession: {
      //   justifyContent: 'space-between',
      paddingTop: 20,
      //   flexWrap: 'wrap',
      //   flexDirection: 'row',
    },
    imageVideo: {
      borderRadius: 8,
      width: '100%',
      height: 419,
    },
  });
};

export default ActivityScreen;
