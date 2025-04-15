import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/task/taskSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';

const CustomInput: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const handleAddTask = (
    values: { task: string, description: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (values.task.trim() && values.description.trim()) {
      dispatch(addTask({ name: values.task, description: values.description }));
      resetForm();
      onSuccess();
    }
  };

  return (
    <Formik
      initialValues={{ task: '', description: '' }}
      onSubmit={handleAddTask}
      validationSchema={Yup.object({
        task: Yup.string()
          .required('Task is required')
          .min(3, 'Task must be at least 3 characters'),
        description: Yup.string()
          .required('Description is required')
          .min(5, 'Description must be at least 5 characters'),
      })}
    >
      {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
        <View style={styles.container}>
          <AppTextInput
            placeholder="Enter task name..."
            value={values.task}
            onChangeText={handleChange('task')}
            onBlur={handleBlur('task')}
            label="Task Name"
          />
          {touched.task && errors.task && (
            <Text style={styles.errorText}>{errors.task}</Text>
          )}

          <AppTextInput
            placeholder="Enter task description..."
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            label="Description"
          />
          {touched.description && errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <AppButton title="Add Task" onPress={() => handleSubmit()} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default CustomInput;
