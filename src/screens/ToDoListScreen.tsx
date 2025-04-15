import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../features/task/taskSlice';
import {getTasksFromStorage, saveTasksToStorage} from '../utils/storage';
import {debounce} from 'lodash';
import CustomModal from '../components/CustomModal';
import CustomItem from '../components/TaskItem';

const ToDoListScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksFromStorage = await getTasksFromStorage();
      dispatch(setTasks(tasksFromStorage));
    };

    loadTasks();
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const filteredTasks = tasks?.filter((task: {name: string}) =>
    task?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );
  console.log(tasks, 'tasks');

  const handleSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 500),
    [],
  );

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFloatingButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {filteredTasks?.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks found.</Text>
      ) : (
        <FlatList
          data={searchQuery ? filteredTasks : tasks}
          renderItem={({item}) => (
            <CustomItem
              id={item.id}
              name={item.name}
              completed={item.completed}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleFloatingButtonPress}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      {/* Use the TCustomModal component */}
      <CustomModal
        isVisible={modalVisible}
        onBackdropPress={handleModalClose}
        onBackButtonPress={handleModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 30},
  header: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  headerText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 15,
    paddingLeft: 10,
    borderRadius: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 60,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: '#007bff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
  },
  noTasksText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ToDoListScreen;
