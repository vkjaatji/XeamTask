import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import { saveUser } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import AppTextInput from '../components/AppTextInput'; // Your custom input component
import AppButton from '../components/AppButton'; // Import AppButton

const SignupScreen = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSignUp = async (values, setSubmitting, setErrors) => {
    try {
      await auth().createUserWithEmailAndPassword(values.email, values.password);
      dispatch(setUser(values.email));
      await saveUser(values.email);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered.' });
      } else {
        setErrors({ general: 'Registration failed. Try again.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { padding: width * 0.1 }]}
    >
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          handleSignUp(values, setSubmitting, setErrors);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.inner}>
            <Text style={styles.title}>Create Account 🚀</Text>

            <AppTextInput
              label="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={touched.email && errors.email ? errors.email : ''}
            />

            <AppTextInput
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder="Enter password"
              secureTextEntry
              error={touched.password && errors.password ? errors.password : ''}
            />

            <AppTextInput
              label="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder="Re-enter password"
              secureTextEntry
              error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''}
            />

            {errors.general && <AppTextInput error={errors.general} />}

            <AppButton
              title="Sign Up"
              onPress={handleSubmit as any}
              disabled={isSubmitting}
              loading={isSubmitting}
            />

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Already have an account? Login</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
  linkText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginVertical: 5,
    textAlign: 'left',
  },
});

export default SignupScreen;
