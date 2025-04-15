import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {setUser} from '../features/auth/authSlice';
import {removeUser} from '../utils/storage';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = useSelector((state: RootState) => state.auth.user);

  const logout = async () => {
    try {
      await auth().signOut(); // Firebase logout
      await removeUser(); // Clear storage
      dispatch(setUser(null)); // Clear redux user

      // Navigate to OpenStack root (e.g., Login)
      navigation.dispatch(StackActions.replace('Login'));
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {email}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;
