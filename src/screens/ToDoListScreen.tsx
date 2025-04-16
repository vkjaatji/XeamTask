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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../features/task/taskSlice';
import {getTasksFromStorage, saveTasksToStorage} from '../utils/storage';
import {debounce} from 'lodash';
import CustomModal from '../components/CustomModal';
import CustomItem from '../components/CustomItem';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ToDoListScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSearch, setTempSearch] = useState('');

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

  const handleSearch = useCallback(
    debounce((query: string) => setSearchQuery(query), 300),
    [],
  );

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleFloatingButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      

      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
        <Text style={styles.headerText}>To-Do List</Text>
      </View>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        placeholderTextColor="gray"
        value={tempSearch}
        onChangeText={(text) => {
          setTempSearch(text);
          handleSearch(text);
        }}
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

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleFloatingButtonPress}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <CustomModal
        isVisible={modalVisible}
        onBackdropPress={handleModalClose}
        onBackButtonPress={handleModalClose}
      />
    </SafeAreaView>
  );
};

export default ToDoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
    // top: 20,
    left: 0,
    zIndex: 10,
    padding: 10,
  },
  header: {
    marginTop: 30,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent:"center"
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
    color: '#000',
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
