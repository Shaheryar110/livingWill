import firestore from '@react-native-firebase/firestore';
import {AddSearchData} from './consultingServices.types';

export const addSearch = async ({searchText, uid, id}: AddSearchData) => {
  return await firestore()
    .collection('userSearch')
    .doc(id)
    .set({
      searchText,
      uid,
      id,
    })
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
export const getDocByParams = async (docName: string) => {
  try {
    const docRef = firestore().collection('consulting').doc(docName);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};
