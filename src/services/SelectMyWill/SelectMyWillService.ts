import firestore from '@react-native-firebase/firestore';

type AddSelectMyWill = {
  id: string;
  selectedItems: string[];
  contactNumber: string;
};

export const addSelectMyWill = ({
  id,
  selectedItems,
  contactNumber,
}: AddSelectMyWill) => {
  return firestore()
    .collection('SelectedWills')
    .doc(id)
    .set({
      selectedItems,
      contactNumber,
    })
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log(err);
      return true;
    });
};

export const getWillsByPhoneNumber = async (uid: string) => {
  try {
    const selectedItemsSet = new Set<string>(); // Create a Set to store unique values
    const notesData: any[] = [];
    const querySnapshot = await firestore()
      .collection('SelectedWills')
      .where('contactNumber', '==', uid)
      .get();

    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.selectedItems && data.selectedItems.length > 0) {
        data.selectedItems.forEach((item: string) => {
          selectedItemsSet.add(item); // Add each item to the Set
        });
      }
    });

    const mergedSelectedItems = Array.from(selectedItemsSet); // Convert Set to array

    for (const itemId of mergedSelectedItems) {
      // Perform a Firestore query for each item
      const querySnapshot = await firestore()
        .collection('notes')
        .doc(itemId) // Use the item as the document ID
        .get();

      if (querySnapshot.exists) {
        const data = querySnapshot.data();
        if (data) {
          notesData.push(data); // Add the data to the notesData array
        }
      }
    }
    // console.log(notesData, 'notesData');
    return notesData; // Return the merged array
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
};
