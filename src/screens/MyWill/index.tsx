import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContactCard from '../../utils/ContactCard';
import {config} from '../../../config/gluestack-ui.config';
import {Block} from '../../components/App';
import MyWillCard from '../../utils/MyWillCard';
import {MyWillScreenProps} from '../../types/NavigationTypes.types';
import {useSelector} from 'react-redux';
import {StoreState} from '../../redux/reduxStore';
import {
  deleteWillById,
  getWillsByUid,
} from '../../services/willServices/willServices';
import {WillsDataResponse} from '../../services/willServices/willServices.types';
import FloatingButton from '../../components/App/FloatingButton';
import {Toast} from 'react-native-toast-notifications';
import {TestIds, useInterstitialAd} from 'react-native-google-mobile-ads';

const Index: React.FunctionComponent<MyWillScreenProps> = ({navigation}) => {
  const [wills, setWills] = useState<WillsDataResponse[]>([]);
  const userData = useSelector((state: StoreState) => state.user);
  const adUnitId = 'ca-app-pub-6520773465788662/1415219443';
  const {isLoaded, isClosed, load, show, error} = useInterstitialAd(adUnitId);
  const deleteContact = (id: string) => {
    deleteWillById(id)
      .then(() => {
        Toast.show('Will Added', {
          type: 'success',
        });
        getWill();
      })
      .catch(err => {
        console.log(err);
        Toast.show('An error occurred', {
          type: 'error',
        });
      });
  };
  const getWill = () => {
    getWillsByUid(userData.uid).then(data => setWills(data));
  };
  useEffect(() => {
    getWill();
  }, [navigation]);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    console.log(isLoaded, 'loaded', error);
  }, [isLoaded, error]);
  if (isLoaded) show();
  return (
    <React.Fragment>
      <Block
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 90,
        }}>
        <>
          {wills.map((item, index) => {
            let bg = config.tokens.colors.linear;
            let color = 'grey';
            return (
              <MyWillCard
                color={color}
                key={index}
                background={bg}
                phone={item.datetime}
                name={item.title}
                decription={item.description}
                onPress={() => {
                  deleteContact(item.id);
                }}
                hideIcons={false}
              />
            );
          })}
        </>
      </Block>
      <FloatingButton
        onPress={() => navigation.navigate('newWill')}
        bottom={50}
        icon="note-plus"
      />
    </React.Fragment>
  );
};

export default Index;

const styles = StyleSheet.create({});
