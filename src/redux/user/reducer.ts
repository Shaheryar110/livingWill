import {PayloadAction} from '@reduxjs/toolkit';
import {UserSliceType} from './slice';

type stateType = UserSliceType;
type actionType = PayloadAction<Partial<UserSliceType>>;

export const setUser = (state: stateType, action: actionType) => {
  const {email, creationTime, fullName, isPrimium, phone, uid, drawerModal} =
    action.payload;

  state.email = email !== undefined ? email : state?.email;
  state.creationTime =
    creationTime !== undefined ? creationTime : state?.creationTime;
  state.fullName = fullName !== undefined ? fullName : state?.fullName;
  state.isPrimium = isPrimium !== undefined ? isPrimium : state?.isPrimium;
  state.phone = phone !== undefined ? phone : state?.phone;
  state.uid = uid !== undefined ? uid : state?.uid;
  state.drawerModal =
    drawerModal !== undefined ? drawerModal : state?.drawerModal;
};
