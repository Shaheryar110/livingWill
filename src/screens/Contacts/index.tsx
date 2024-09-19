import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ContactsScreenProps} from '../../types/NavigationTypes.types';
import {Block} from '../../components/App';
import ContactCard from './ContactCard';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {
  deleteContactById,
  getContactsByUid,
} from '../../services/contactServices/contactServices';
import {ContactDataResponse} from '../../services/contactServices/contactServices.types';
import FloatingButton from '../../components/App/FloatingButton';

const Contacts: React.FunctionComponent<ContactsScreenProps> = ({
  navigation,
}) => {
  const [contacts, setContacts] = useState<ContactDataResponse[]>([]);
  const userData = useSelector((state: StoreState) => state.user);
  const getCotact = () => {
    getContactsByUid(userData.uid).then(data => setContacts(data));
  };
  const deleteContact = (id: string) => {
    deleteContactById(id).then(() => getCotact());
  };

  useEffect(() => {
    getCotact();
  }, [navigation]);

  return (
    <React.Fragment>
      <Block
        source={require('../../../assets/Images/Capture.png')}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 70,
        }}
        paddingBottom={100}>
        {contacts.map((item, index) => {
          return (
            <ContactCard
              onPress={() => deleteContact(item.id)}
              onClick={() => {
                navigation.navigate('AddContact');
              }}
              key={index}
              name={item.fullName}
              phone={item.phoneNo}
              img={
                item.image ||
                'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/images%2F237729d1-02f1-11ee-bdf3-15a150d7ec8f.jpg?alt=media&token=2f9915c3-9787-451c-af54-b7aa497ba310'
              }
              desc={item.relation}
            />
          );
        })}
      </Block>
      <FloatingButton
        onPress={() => {
          navigation.navigate('AddContact');
        }}
        bottom={80}
        icon="account-plus"
      />
    </React.Fragment>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  parentBox: {
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    fontWeight: '600',
  },
  phone: {
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
  },
});
