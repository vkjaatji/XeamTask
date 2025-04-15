/* eslint-disable eqeqeq */
import {createSlice} from '@reduxjs/toolkit';
import {act} from 'react-test-renderer';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    data: [
      // {
      //   name: 'anil',
      //   email: 'anil@gmai.com',
      //   address: 'Hissar',
      //   phone: '987654323',
      // },
    ],
  },
  reducers: {
    addUser(state, action) {
      state.data.push(action.payload);
    },
    updateUser(state, action) {
      let temp = state.data;
      temp.map((item, index) => {
        if (index === action.payload.index) {
          item.name = action.payload.name;
          item.email = action.payload.email;
          item.phone = action.payload.phone;
          item.address = action.payload.address;
        }
      });
    },
    deleteUser(state, action) {
      let temp = state.data;
      let final = temp.filter((item, index) => {
        return index != action.payload;
      });
      state.data = final;
    },
  },
});

export const {addUser, updateUser, deleteUser} = UserSlice.actions;
export default UserSlice.reducer;
