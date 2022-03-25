import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from '../../components';
import {colors} from '../../assets/style';
// import {useNotification} from '../../hooks/useNotification';

export const ListDiploma = ({style}: {style?: Object; certificate: Object}) => {
  // const notification = useNotification();

  const width = Dimensions.get('screen').width;
  const styles = makeStyles({width});

  // const person = `${certificate?.firstname}${certificate?.lastname ? ' ' + certificate.lastname : ''}`;

  // const handlePress = async () => {
  // URL du fichier à télécharger
  // const FILE_URL = certificate?.documentUrl;
  // Récupération de l'extension
  // let fileExt: any = /[^.]+$/.exec(FILE_URL)[0];
  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  // const {
  //   dirs: {DownloadDir, DocumentDir},
  // } = RNFetchBlob.fs;
  // const directoryPath = Platform.select({
  //   ios: DocumentDir,
  //   android: DownloadDir,
  // });
  // const filename = `diplome_${person}_${certificate.createdAt}.${fileExt}`;
  // const filePath = `${directoryPath}/${filename}`;

  // const configOptions = Platform.select({
  //   ios: {
  //     fileCache: true,
  //     path: filePath,
  //     appendExt: fileExt,
  //     notification: true,
  //   },
  //   android: {
  //     fileCache: true,
  //     appendExt: fileExt,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       mime: 'application/pdf',
  //       title: filename,
  //       path: filePath,
  //       mediaScannable: true,
  //       notification: true,
  //     },
  //   },
  // });

  // Téléchargement
  // RNFetchBlob.config(configOptions)
  //   .fetch('GET', FILE_URL)
  //   .then(resp => {
  //     // Notif de succès
  //     notification.set({type: 'certificateDownloaded'});
  //     notification.show();
  //     if (osName() === 'ios') {
  //       RNFetchBlob.ios.previewDocument(resp.path());
  //     }
  //   })
  //   .catch(e => {
  //     console.log(e);
  //     console.log('Download certificate error: ', e);
  //   });
  // };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.containPadding}>
        <Text fontColor="tertiary" mode="body" weight="bold">
          {/*{person}*/}
        </Text>
        <View style={styles.alignView}>
          <Text weight="light" fontColor="tertiary">
            {/*{certificate?.activity?.title}*/}
            {/*{certificate?.level ? ` - Niveau ${certificate?.level}` : ''}*/}
          </Text>
          <Text weight="light" fontColor="tertiary">
            {/*{certificate?.createdAt}*/}
          </Text>
        </View>
      </View>
      {/*<Button onPress={handlePress} mode="icon" square />*/}
    </View>
  );
};

const makeStyles = ({width}: any) => {
  return StyleSheet.create({
    root: {},
    container: {
      // flex: 1,
      flexDirection: 'row',
      maxWidth: width,
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: colors.white,
      borderRadius: 4,
      shadowColor: '#002E72',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 10,
    },
    containPadding: {
      padding: 14,
    },
    alignView: {
      // flexDirection: 'row',
    },
  });
};

export default ListDiploma;
