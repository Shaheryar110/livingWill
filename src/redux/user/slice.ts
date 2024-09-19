import {createSlice} from '@reduxjs/toolkit';
import {setUser} from './reducer';

export type UserSliceType = {
  email: string;
  creationTime: number;
  fullName: string;
  isPrimium: boolean;
  drawerModal: boolean;
  phone: string;
  uid: string;
};

export const userSliceIntialState: UserSliceType = {
  email: '',
  creationTime: 0,
  fullName: '',
  isPrimium: false,
  phone: '',
  uid: '',
  drawerModal: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userSliceIntialState,
  reducers: {setUser},
});

export const userActions = userSlice.actions;
