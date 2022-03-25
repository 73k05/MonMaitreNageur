import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../../components';

export const ActionModal = ({
  ariaLabelDismiss,
  ariaLabel,
  onPress = () => {},
  onClose = () => {},
  mode,
  ...props
}) => {
  return mode === '2Button' ? (
    <View style={styles.alignButton}>
      <Button style={styles.marginRightButton} onPress={onClose}>
        {ariaLabelDismiss}
      </Button>
      <Button
        color="secondary"
        style={styles.marginLeftButton}
        onPress={onPress}>
        {ariaLabel}
      </Button>
    </View>
  ) : (
    <View style={styles.alignButton}>
      <Button onPress={onPress} color="secondary">
        {ariaLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  alignButton: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRightButton: {
    marginRight: 5,
  },
  marginLeftButton: {
    marginLeft: 5,
  },
});

export default ActionModal;
