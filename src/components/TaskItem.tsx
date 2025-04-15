import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteTask, toggleTask} from '../features/task/taskSlice';
import {Swipeable} from 'react-native-gesture-handler';

interface CustomItemProps {
  id: string;
  name: string;
  completed: boolean;
}

const CustomItem: React.FC<CustomItemProps> = ({id, name, completed}) => {
  const dispatch = useDispatch();
  const swipeableRef = useRef<Swipeable>(null);

  const handleSwipeLeftOpen = () => {
    dispatch(toggleTask(id));
    swipeableRef.current?.close(); // auto-close swipe
  };

  const renderLeftActions = () => (
    <View
      style={[
        styles.swipeAction,
        {backgroundColor: completed ? '#ff9f0a' : '#4cd964'},
      ]}>
      <Text style={styles.swipeText}>
        {completed ? 'Uncomplete' : 'Complete'}
      </Text>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={handleSwipeLeftOpen}>
      <View style={styles.taskContainer}>
        <Text style={[styles.taskText, completed && styles.completed]}>
          {name}
        </Text>

        <TouchableOpacity
          onPress={() => dispatch(deleteTask(id))}
          style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  swipeAction: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
  },
  swipeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomItem;
