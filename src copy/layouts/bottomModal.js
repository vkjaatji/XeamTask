import {View, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import Modal from 'react-native-modal';

const BottomModal = ({
  bottomSheetActive = false,
  setBottomSheetActive,
  height,
  children,
  childrenComponenet = false,
  avoidKeyboard = false,
  bottomModalStyle = {},
}) => {
  return (
    <Modal
      onBackdropPress={() => setBottomSheetActive(false)}
      style={{...styles.modal, ...bottomModalStyle}}
      isVisible={bottomSheetActive}
      animationInTiming={700}
      useNativeDriver
      avoidKeyboard={avoidKeyboard}
      animationOutTiming={700}
      animationIn="slideInUp"
      animationOut="slideInDown">
      <View style={{...styles.modalContainer}}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    // bottom: 20,
    left: -20,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default React.memo(BottomModal);
