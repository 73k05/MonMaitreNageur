import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from '../../components';

export const OverlayStretch = ({onGo, onClose}: any) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text center weight="bold" mode="body">
          Les exercices sont terminés,
        </Text>
        <Text center weight="bold" mode="body">
          souhaitez-vous passer aux étirements ?
        </Text>
        <View style={[styles.paddingView, styles.alignButtonView]}>
          <View style={styles.marginButtonViewRight}>
            <Button mode="contained" color="primary" onPress={onGo}>
              OUi, c’est parti !
            </Button>
          </View>
          <View style={styles.marginButtonViewLeft}>
            <Button mode="contained" color="secondary" onPress={onClose}>
              Non, j’ai terminé
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10000,
    backgroundColor: 'rgba(0, 46, 114, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paddingView: {
    paddingTop: 30,
  },
  alignButtonView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginButtonViewRight: {
    marginRight: 5,
  },
  marginButtonViewLeft: {
    marginLeft: 5,
  },
  marginIconViewRight: {
    marginRight: 25,
  },
  marginIconViewLeft: {
    marginLeft: 25,
  },
});

export default OverlayStretch;
