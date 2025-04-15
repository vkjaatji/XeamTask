/* eslint-disable react-native/no-inline-styles */

import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import TextField from '../components/TextField';
import {useDispatch} from 'react-redux';
import {validateLength} from '../helpers/globalValidation';
import {addUser, updateUser} from '../redux/UserSlice';
import Main_Button from './Main_Button';

const AddUser = ({setBottomSheetActive, editData, setEditData, index}) => {
  const [userDataPayload, setuserDataPayload] = useState({
    name: editData?.name || '',
    email: editData?.email || '',
    phone: editData?.phone || '',
    address: editData?.address || '',
  });
  const dispatch = useDispatch();
  const handleChange = (key, value) => {
    userDataPayload[`${key}`] = value;
    setuserDataPayload({...userDataPayload});
  };

  const handleSumbit = () => {
    if (!validateLength(userDataPayload?.name)) {
      Alert.alert('name fields are required');
    } else if (!validateLength(userDataPayload?.email)) {
      Alert.alert('email fields are required');
    } else if (!validateLength(userDataPayload?.phone)) {
      Alert.alert('phone fields are required');
    } else if (!validateLength(userDataPayload?.address)) {
      Alert.alert('address fields are required');
    } else {
      if (editData) {
        dispatch(
          updateUser({
            ...userDataPayload,
            index: index,
          }),
        );
        setEditData();
      } else {
        dispatch(addUser(userDataPayload));
      }
      setBottomSheetActive(false);
    }
  };

  return (
    <View style={{marginHorizontal: 20}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Name</Text>
        <TextField
          defaultValue={userDataPayload.name}
          placeholder={'Name'}
          handleChange={value => {
            handleChange('name', value);
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Phone</Text>
        <TextField
          defaultValue={userDataPayload.phone}
          placeholder={'Phone'}
          handleChange={value => {
            handleChange('phone', value);
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Address</Text>
        <TextField
          defaultValue={userDataPayload.address}
          placeholder={'Address'}
          handleChange={value => {
            handleChange('address', value);
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Email</Text>
        <TextField
          defaultValue={userDataPayload.email}
          placeholder={'Email'}
          handleChange={value => {
            handleChange('email', value);
          }}
        />
      </View>
      <View style={{ marginTop:30 ,width:"100%"}}>
        <Main_Button
          onClick={() => handleSumbit()}
          buttonname={editData ? 'Update' : 'Save'}
        />

        {/* <Text onPress={() => handleSumbit()}>
          {editData ? 'Update' : 'Save'}
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 10,
  },
  text: {
    marginVertical: 4,
  },
});

export default AddUser;
