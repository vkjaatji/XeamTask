/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../redux/UserSlice';
import AddUser from '../components/AddUser';
import BottomModal from '../layouts/bottomModal';
import Main_Button from '../components/Main_Button';

const Users = () => {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const [bottomSheetActive, setBottomSheetActive] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const users = useSelector(state => state.user);
  return (
    <View style={{flex: 1}}>
      <Text>Users</Text>
      <FlatList
        data={users.data}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                height: 120,
                borderWidth: 1,
                marginVertical: 10,
                alignSelf: 'center',
                justifyContent: 'space-between',
                padding: 10,
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{fontSize: 17}}>{'Name  =' + item.name}</Text>
                <Text style={{fontSize: 17}}>{'Email  =' + item.email}</Text>
                <Text style={{fontSize: 17}}>{'Phone  =' + item.phone}</Text>
                <Text style={{fontSize: 17}}>
                  {'Address  =' + item.address}
                </Text>
              </View>
              <View>
                <Text
                  onPress={() =>
                    // navigation.navigate('Add_User', {
                    //   type: 'edit',
                    //   data: item,
                    //   index: index,
                    // })
                    {
                      setEditIndex(index);
                      setBottomSheetActive(true);
                      setEditData(item);
                    }
                  }
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    padding: 5,
                  }}>
                  Edit
                </Text>
                <Text
                  onPress={() => {
                    dispatch(deleteUser(index));
                  }}
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    marginVertical: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red',
                  }}>
                  Delete
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View style={{bottom: 30}}>
        <Main_Button
          onClick={() => {
            setBottomSheetActive(true);
          }}
          buttonname={'Add New User'}
        />
      </View>

      {bottomSheetActive && (
        <BottomModal
          bottomSheetActive={bottomSheetActive}
          setBottomSheetActive={setBottomSheetActive}>
          <AddUser
            setBottomSheetActive={setBottomSheetActive}
            editData={editData ? editData : null}
            setEditData={() => {
              setEditData(null);
              setEditIndex(null);
            }}
            index={editIndex}
          />
        </BottomModal>
      )}
    </View>
  );
};

export default Users;
