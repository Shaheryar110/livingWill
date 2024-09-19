import {AddFeedbackData} from './feedbackServices.types';
import firestore from '@react-native-firebase/firestore';
export const addFeedback = async ({
  id,
  uid,
  rating,
  description,
}: AddFeedbackData) => {
  return firestore()
    .collection('notes')
    .doc(id)

    .set({
      id,
      uid,
      rating,
      description,
    })
    .then(_ => true)
    .catch(err => {
      console.log(err);
      false;
    });
};
