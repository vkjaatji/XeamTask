/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Main_Button = ({onClick, buttonname}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: '85%',
        height: 50,
        // borderWidth: 1,
        borderRadius: 10,
        // marginTop: 30,
        backgroundColor: '#099900',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <Text style={{fontSize: 20}}>{buttonname}</Text>
    </TouchableOpacity>
  );
};

export default Main_Button;
