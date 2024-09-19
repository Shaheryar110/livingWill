import { Dimensions, View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { config } from '../../../config/gluestack-ui.config';
import ContactCard from '../../utils/ContactCard';
import { getContactsByUid } from '../../services/contactServices/contactServices';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { ContactDataResponse } from '../../services/contactServices/contactServices.types';
import { RootStackParamListAPP, SelectMyWillScreenProps } from '../../types/NavigationTypes.types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');
type IProps = {

}
const ContactSlider: React.FC<IProps> = ({ }) => {
  const [contacts, setContacts] = useState<ContactDataResponse[]>([]);
  const userData = useSelector((state: StoreState) => state.user);
  const navigation = useNavigation<NavigationProp<RootStackParamListAPP>>()

  useEffect(() => {
    getContactsByUid(userData.uid).then(data => setContacts(data));
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ flexDirection: 'row' }}>
        {contacts.map((item, index) => {
          let bg =
            index % 2 == 0
              ? config.tokens.colors.secondaryLight
              : config.tokens.colors.linear;
          let color = index % 2 == 0 ? config.tokens.colors.primary0 : 'grey';
          return (
            <ContactCard
              color={color}
              key={index}
              background={bg}
              src={
                item?.image ||
                'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/download.jfif?alt=media&token=62a283bd-493e-41e6-897b-06df5f9297a4'

              }
              phone={item.phoneNo}
              name={item.fullName}
              relation={item.relation}
              viewContactDetails={() => {
                navigation.navigate('SingleContact', { phoneNumber: item.phoneNo, fullname: item.fullName, source: item?.image });
              }}
              onClickSend={() => {
                navigation.navigate('SelectMyWill', { phoneNumber: item.phoneNo });
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ContactSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
  },
  bannerContainer: {
    width: 250,
    marginHorizontal: 8,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'contain',
  },
  paginationContainer: {
    paddingVertical: 0,
    marginTop: 8,
  },
  activePaginationDot: {
    width: 40,
    height: 5,
    borderRadius: 5,
    marginHorizontal: -5,
  },
  inActivePaginationDot: {
    width: 30,
    height: 10,
    borderRadius: 5,
    marginHorizontal: -12,
  },
  contactCardBox: {
    width: '100%',
    borderRadius: 10,
    padding: 18,
  },
  cardProfileSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    gap: 10,
  },
  iconBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 8,
    gap: 10,
  },
  icon: {
    height: 40,
    width: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: config.tokens.colors.secondary,
    elevation: 2,
  },
});
