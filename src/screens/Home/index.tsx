import { Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Block } from '../../components/App';
import HeaderHome from './HeaderHome';
import { Heading, ScrollView, Text } from '@gluestack-ui/themed';
import { config } from '../../../config/gluestack-ui.config';
import InputFeilds from '../../utils/InputFeild';
import BannerCarousel from './BannerCarousel';
import HomeCard from './HomeCard';
import CurveBox from './CurveBox';
import ContactSlider from './ContactSlider';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  HomeScreenProps,
  RootStackParamList,
} from '../../types/NavigationTypes.types';

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const data = [
    'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/images%2FGroup%2043.png?alt=media&token=4a15eb3b-adab-4747-b888-43006b6658cb',
    'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/images%2FGroup%2043.png?alt=media&token=4a15eb3b-adab-4747-b888-43006b6658cb',
    'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/images%2FGroup%2043.png?alt=media&token=4a15eb3b-adab-4747-b888-43006b6658cb',
  ];
  const cardData = [
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2024.png?alt=media&token=fd401f06-5a4d-4586-be34-4c7f15765581',
      text: 'My Will',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2025.png?alt=media&token=3e149999-f206-4d5b-9acd-893ed31f11c4',
      text: 'Near By Hospital',
    },
    // {
    //   img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2026.png?alt=media&token=7b4d1f1a-52dd-4330-8164-076cb527c81a',
    //   text: 'Doctors',
    // },
  ];
  const cardData1 = [
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2027.png?alt=media&token=d388e73a-d921-4d6a-bb92-31b3c6c63fec',
      text: 'Fever',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2028.png?alt=media&token=8fd1f4f4-3dff-4ab3-8dfb-dd493af23d29',
      text: 'Chest Pain',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/Home%2FGroup%2029.png?alt=media&token=d077137d-054d-4491-a424-0c3a85124f9f',
      text: 'Pain in Back',
    },
  ];

  return (
    <Block
      paddingBottom={Platform.OS === 'ios' ? 200 : 130}
      source={require('../../../assets/Images/Capture.png')}>
      <View style={styles.searchBox}>
        <Text
          color={config.tokens.colors.primary0}
          textAlign="left"
          marginBottom={5}>
          Welcome To The{' '}
        </Text>
        <Text
          color={config.tokens.colors.primaryM}
          fontSize={25}
          textAlign="left"
          fontWeight="500"
          marginBottom={5}>
          Livingwill{' '}
        </Text>
        <InputFeilds
          placeholder="Search"
          showSearch={true}
          icon={0}
          onChangeText={e => setSearch(e)}
          value={search}
          onPressSearch={() =>
            navigation.navigate('Consulting', { search: search })
          }
        />
      </View>
      <BannerCarousel carouselData={data} />
      <View style={styles.flexClass}>
        {cardData.map((item, index) => (
          <HomeCard
            onPress={() => {
              if (item.text === 'My Will') navigation.navigate('MyWill');
              if (item.text === 'Near By Hospital') navigation.navigate('Map');
            }}
            key={index}
            uri={item.img}
            text={item.text}
          />
        ))}
      </View>
      <View style={styles.syntomsBox}>
        <Heading style={styles.heading}>What Are Your Symptoms ?</Heading>
        <View style={[styles.flexClass, { marginTop: 0 }]}>
          {cardData1.map((item, index) => {
            return <CurveBox key={index} uri={item.img} text={item.text} onPressSearch={() =>
              navigation.navigate('Consulting', { search: item.text })
            } />;
          })}
        </View>
      </View>
      <View style={styles.syntomsBox}>
        <Heading style={styles.heading}>My Contacts</Heading>

        <ContactSlider />
      </View>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 90,
    width: '100%',
    paddingHorizontal: 14,
  },
  syntomsBox: {
    paddingHorizontal: 14,
    width: '100%',
    overflow: 'hidden',
  },
  heading: {
    fontSize: 24,
    color: config.tokens.colors.primary0,
    paddingLeft: 10,
  },
  flexClass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
