import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import * as ScreenOrientation from 'expo-screen-orientation';
import {StyleSheet, View} from 'react-native';
import AppStatusBar from '../layouts/AppStatusBar';

export const Player = ({
  video,
  back,
  end,
  disableFullscreen = false,
  disablePlayPause = false,
  disableSeekbar = false,
  disableVolume = false,
  disableTimer = false,
  disableBack = false,
}: any) => {
  const navigation = useNavigation();
  const [play, setPlay] = useState(true);
  const player = useRef(null);

  /**
   * Action à exécuter au chargement de l’écran
   */
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
  }, []);

  /**
   * Action à exécuter quand la navigation est prête
   */
  useEffect(() => {
    return navigation.addListener('blur', () => {
      player.current = null;
      setPlay(false);
    });
  }, [navigation]);

  /**
   * Action à exécuter sur le bouton cacher
   */
  /*const handleHiddenAction = useCallback(async () => {
    await end();
  }, [end]);*/

  /**
   * Action à exécuter sur le bouton retour
   */
  const handleBackAction = useCallback(async () => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT,
    ).then(value => {
      console.log(`Orientation locked: ${value}`);
    });
    player.current = null;
    await back();
  }, [back]);

  /**
   * Action à exécuter à la fin de la vidéo
   */
  const handleEndVideoAction = useCallback(async () => {
    await end();
  }, [end]);

  return (
    <View style={styles.root}>
      <AppStatusBar transparent />
      <VideoPlayer
        disableBack={disableBack}
        disableFullscreen={disableFullscreen}
        disablePlayPause={disablePlayPause}
        disableSeekbar={disableSeekbar}
        disableVolume={disableVolume}
        disableTimer={disableTimer}
        disableFocus={true}
        ignoreSilentSwitch={'ignore'}
        source={{uri: video}}
        onBack={handleBackAction}
        fullscreen={true}
        fullscreenAutorotate={true}
        fullscreenOrientation={'landscape'}
        controls={false}
        paused={!play}
        ref={player}
        style={styles.player}
        resizeMode={'contain'}
        //tapAnywhereToPause={true}
        onEnd={handleEndVideoAction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  hiddenActionButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 1000,
    width: 100,
    height: 100,
  },
  player: {
    width: '100%',
    height: '90%',
  },
});

export default Player;
