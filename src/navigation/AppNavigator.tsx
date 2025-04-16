import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../app/store';
import {getUser} from '../utils/storage';
import {setUser, setLoading} from '../features/auth/authSlice';
import {ActivityIndicator, View} from 'react-native';
import SignupScreen from '../screens/SignupScreen';
import ToDoListScreen from '../screens/ToDoListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {user, loading} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await getUser();
      if (savedUser) dispatch(setUser(savedUser));
      dispatch(setLoading(false));
    };
    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ToDoListScreen" component={ToDoListScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
