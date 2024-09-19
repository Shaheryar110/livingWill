import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ConsultingScreenProps} from '../../types/NavigationTypes.types';
import {Block} from '../../components/App';
import InputFeilds from '../../utils/InputFeild';
import {config} from '../../../config/gluestack-ui.config';
import {getDocByParams} from '../../services/consultingService/consultingServices';
import {useWindowDimensions} from 'react-native';
import RenderHtml from 'react-native-render-html';
import CurveBox from '../Home/CurveBox';
import {Heading} from '@gluestack-ui/themed';
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
const Consulting: React.FunctionComponent<ConsultingScreenProps> = ({
  route,
  navigation,
}) => {
  const {width} = useWindowDimensions();
  const [consulting, setConsulting] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const getConsultingDoc = () => {
    getDocByParams(search).then(data => {
      console.log(data, 'data');
      if (data) {
        setConsulting(data?.text);
      } else {
        setConsulting('');
      }
    });
  };

  useEffect(() => {
    setSearch(route?.params?.search);
    getDocByParams(route?.params?.search).then(data => {
      setConsulting(data?.text);
    });
  }, [route]);

  return (
    <Block
      contentContainerStyle={{paddingTop: 80}}
      source={require('../../../assets/Images/Capture.png')}>
      <View style={styles.feildBox}>
        <InputFeilds
          placeholder="Search"
          showSearch={true}
          icon={0}
          value={search}
          onPressSearch={() => {
            getConsultingDoc();
          }}
          onChangeText={txt => setSearch(txt)}
        />
      </View>
      {consulting ? (
        <View style={styles.contentBox}>
          <RenderHtml contentWidth={width} source={{html: consulting}} />
        </View>
      ) : (
        <View style={styles.syntomsBox}>
          <Heading style={styles.heading}>What Are Your Symptoms ?</Heading>
          <View style={[styles.flexClass, {marginTop: 0}]}>
            {cardData1.map((item, index) => {
              return (
                <CurveBox
                  key={index}
                  uri={item.img}
                  text={item.text}
                  onPressSearch={() =>
                    navigation.navigate('Consulting', {search: item.text})
                  }
                />
              );
            })}
          </View>
        </View>
      )}
    </Block>
  );
};

export default Consulting;

const styles = StyleSheet.create({
  feildBox: {
    marginHorizontal: 10,
  },
  contentBox: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: config.tokens.colors.secondary,
    opacity: 0.7,
    color: 'white',
    marginBottom: 120,
  },
  flexClass: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
});
