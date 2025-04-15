import {TextInput, StyleSheet, View} from 'react-native';
import React from 'react';

const TextField = ({
  placeholder,
  rightImage,
  leftImage,
  defaultValue,
  color,
  handleChange,
  multiline = false,
  addDetails = false,
  style = {},
  value = undefined,
  iconeName = undefined,
  onIconeChane,
  secureTextEntry = false,
  leftIcone,
}) => {
  return (
    <View style={[styles.fieldContainer]}>
      <TextInput
        secureTextEntry={secureTextEntry}
        defaultValue={defaultValue}
        value={value}
        multiline={multiline}
        onChangeText={text => handleChange(text.trim())}
        placeholderTextColor={'gray'}
        placeholder={placeholder}
        style={[styles.textInput]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    width: '95%',
  },
  textInput: {
    padding: 20,
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
  },
  strightLine: {
    borderWidth: 0.6,
    height: 25,
    borderColor: 'red',
  },
});
export default React.memo(TextField);
