import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';

import {setUser} from '../features/auth/authSlice';
import {saveUser} from '../utils/storage';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton'; // Import your custom AppButton

const LoginScreen = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
  });

  const handleLogin = async (
    values: {email: string; password: string},
    setSubmitting: (s: boolean) => void,
    setErrors: any,
  ) => {
    try {
      await auth().signInWithEmailAndPassword(values.email, values.password);
      dispatch(setUser(values.email));
      await saveUser(values.email);
    } catch (err) {
      setErrors({general: 'Invalid credentials. Please try again.'});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, {padding: width * 0.1}]}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={(values, {setSubmitting, setErrors}) =>
          handleLogin(values, setSubmitting, setErrors)
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View style={styles.inner}>
            <Text style={styles.title}>Welcome Back 👋</Text>

            <AppTextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email && errors.email ? errors.email : ''}
            />

            <AppTextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              isPassword={!isPasswordVisible}
              error={touched.password && errors.password ? errors.password : ''}
            />

            <AppButton
              title="Login"
              onPress={handleSubmit as any}
              disabled={isSubmitting}
              loading={isSubmitting}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 15,
  },
  passwordToggle: {
    marginTop: 10,
    alignItems: 'center',
  },
  passwordToggleText: {
    color: '#007bff',
    fontSize: 14,
  },
});

export default LoginScreen;
