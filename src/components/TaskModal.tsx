// components/TaskModal.tsx

import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import TaskInput from './TaskInput';

interface TaskModalProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  onBackButtonPress: () => void;
}

const TaskModal: FC<TaskModalProps> = ({ isVisible, onBackdropPress, onBackButtonPress }) => {
  return (
    <Modal
    
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <TaskInput onSuccess={onBackButtonPress} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // height:300
  },
});

export default TaskModal;
