import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {AddContactData, ContactDataResponse} from './contactServices.types';
import {Toast} from 'react-native-toast-notifications';

export const getContactsByUid = async (
  uid: string,
): Promise<ContactDataResponse[]> => {
  return await firestore()
    .collection('contacts')
    .where('uid', '==', uid)
    .get()
    .then(result =>
      result.docs.map(
        doc => ({...doc.data(), id: doc.id} as ContactDataResponse),
      ),
    )
    .catch(e => [] as ContactDataResponse[]);
};

export const deleteContactById = async (id: string) => {
  return await firestore()
    .collection('contacts')
    .doc(id)
    .delete()
    .then(() =>
      Toast.show('Contact Form Deleted', {
        type: 'success',
      }),
    );
};

export const addContact = ({
  id,
  fullName,
  phoneNo,
  relation,
  image,
  uid,
  email,
}: AddContactData) => {
  return firestore()
    .collection('contacts')
    .doc(id)
    .set({
      fullName,
      phoneNo,
      relation: relation ? relation : '',
      image: image ? image : null,
      email: email ? email : '',
      uid,
      id,
    })
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log(err);
      return true;
    });
};
