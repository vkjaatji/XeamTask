import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {setUser} from '../features/auth/authSlice';
import {removeUser} from '../utils/storage';
import auth from '@react-native-firebase/auth';
import {useNavigation, StackActions} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const email = useSelector((state: RootState) => state.auth.user);

  const logout = async () => {
    try {
      await auth().signOut();
      await removeUser();
      dispatch(setUser(null));
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const goToToDoList = () => {
    navigation.navigate('ToDoListScreen'); // Make sure 'ToDoList' is defined in your navigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>{email}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={goToToDoList}>
        <Text style={styles.buttonText}>Go to To-Do List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f2f2f2'},
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
