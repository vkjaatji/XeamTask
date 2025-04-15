import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setUser } from '../features/auth/authSlice';
import { removeUser } from '../utils/storage';
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.auth.user);

  const logout = async () => {
    await auth().signOut();
    await removeUser();
    dispatch(setUser(null));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome, {email}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;
