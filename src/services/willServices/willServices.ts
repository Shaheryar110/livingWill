import firestore from '@react-native-firebase/firestore';
import {AddWillData, WillsDataResponse} from './willServices.types';
import {Alert} from 'react-native';

export const addWill = async ({
  id,
  title,
  uid,
  datetime,
  description,
}: AddWillData) => {
  return firestore()
    .collection('notes')
    .doc(id)

    .set({
      title: title,
      datetime: datetime,
      description: description,
      uid: uid,
      id: id,
    })
    .then(_ => true)
    .catch(err => {
      console.log(err);
      false;
    });
};

export const getWillsByUid = async (uid: string) => {
  return await firestore()
    .collection('notes')
    .where('uid', '==', uid)
    .get()
    .then(result =>
      result.docs.map(
        doc => ({...doc.data(), id: doc.id} as WillsDataResponse),
      ),
    )
    .catch(e => [] as WillsDataResponse[]);
};

export const deleteWillById = async (id: string) => {
  return await firestore()
    .collection('notes')
    .doc(id)

    .delete()
    .then(() => Alert.alert('Deleted', 'Note Deleted'));
};
