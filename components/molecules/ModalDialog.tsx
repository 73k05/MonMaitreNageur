import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Headline, ActionModal, CloseIcon} from '../../components';

export const ModalDialog = ({
  onClose = () => {},
  titleModal,
  descModal,
  action,
  visible,
  ariaLabel,
  ariaLabelDismiss,
  mode,
  onPress = () => {},
  ...props
}: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.iconStyle}>
            <CloseIcon color="#C8D9E5" />
          </TouchableOpacity>
          <Headline mode="h4" center>
            {titleModal}
          </Headline>
          <Text fontColor="tertiary" center style={{marginTop: 8}}>
            {descModal}
          </Text>
          {action ? (
            <View style={styles.alignView}>
              <ActionModal
                ariaLabelDismiss={ariaLabelDismiss}
                ariaLabel={ariaLabel}
                mode={mode}
                onPress={onPress}
                onClose={onClose}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(200, 217, 229, 0.6)',
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#002E72',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  iconStyle: {
    alignItems: 'flex-end',
  },
  alignView: {
    alignItems: 'center',
  },
});

export default ModalDialog;
