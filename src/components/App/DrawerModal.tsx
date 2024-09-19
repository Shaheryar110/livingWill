import React, {useEffect, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing,
  Pressable,
  Text,
  Image,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Block from './Block';
import {RootStackParamListAPP} from '../../Types/NavigationTypes.types';
import {useDispatch, useSelector} from 'react-redux';
import {StoreDispatch, StoreState} from '../../redux/reduxStore';
import {userActions} from '../../redux/user/slice';
import {firebase} from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {config} from '../../../config/gluestack-ui.config';
import {logOut} from '../../services/Auth';
import {Toast} from 'react-native-toast-notifications';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
const {width, height} = Dimensions.get('window');
interface DrawerModalProps {}

const DrawerModal: React.FC<DrawerModalProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamListAPP>>();
  const [animation] = useState(new Animated.Value(0));
  const [fade] = useState(new Animated.Value(0));
  const userData = useSelector((state: StoreState) => state.user);
  const dispatch = useDispatch<StoreDispatch>();
  const inset = useSafeAreaInsets();
  // const userData = useSelector((state: StoreState) => state.user);
  const handleModalOpen = () => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 200, // Adjust the duration as needed
        useNativeDriver: true, // Use the native driver for better performance
      }),
    ]).start();
  };

  const handleModalClose = () => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 600, // Adjust the duration as needed
        useNativeDriver: true, // Use the native driver for better performance
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start(() => dispatch(userActions.setUser({drawerModal: false})));
  };

  useEffect(() => {
    if (userData.drawerModal) {
      handleModalOpen();
    } else {
      handleModalClose();
    }
  }, [userData.drawerModal]);
  const drawerTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.7, 0],
  });
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch(err => {
        Toast.show('Error in Logout ', {type: 'error'});
      });
  };
  type PageDataType = {
    text: string;
    url: keyof RootStackParamListAPP;
    icon: React.ReactNode;
  };
  const pagesData: PageDataType[] = [
    {
      text: 'Account',
      url: 'Accounts',
      icon: <FontAwesome name="user" style={styles.iconStyle} />,
    },

    {
      text: 'Privacy Policy',
      url: 'Privacy',
      icon: <MaterialIcons name="privacy-tip" style={styles.iconStyle} />,
    },
    {
      text: 'Terms And Conditions',
      url: 'TermsAndConditions',
      icon: <MaterialIcons name="reviews" style={styles.iconStyle} />,
    },
  ];

  return (
    <Modal visible={userData.drawerModal} transparent>
      <Animated.View style={{opacity: fade}}>
        <Block source={require('../../../assets/Images/drawerBg.png')}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={handleModalClose}
          />
        </Block>
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{translateX: drawerTranslateX}],
          },
        ]}>
        <Pressable
          style={[styles.drawerContent, {paddingTop: inset.top + 30}]}
          onPress={() => {
            dispatch(userActions.setUser({drawerModal: false}));
          }}>
          <Image
            style={styles.logo}
            source={require('../../../assets/Images/living-will.png')}
          />
          <Image
            style={styles.avatar}
            source={{
              uri: firebase.auth().currentUser?.photoURL || '',
            }}
          />
          <Text style={[styles.text1, {fontWeight: '700'}]}>
            {userData?.fullName}
          </Text>
          <Text style={styles.text1}>{userData?.email}</Text>
          <View style={[styles.pagesBox]}>
            {pagesData.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate(item.url);
                    handleModalClose();
                  }}
                  style={styles.singlePage}
                  key={index}>
                  <View style={styles.blur} />
                  {item.icon}
                  <Text style={styles.pageText}>{item.text}</Text>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => {
                handleLogOut();
                handleModalClose();
              }}
              style={{
                marginTop: 210,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 10,
                paddingLeft: 15,
              }}>
              <SimpleLineIcons name="logout" style={styles.iconStyle} />
              <Text style={styles.pageText}>Logout</Text>
            </Pressable>
          </View>
        </Pressable>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    height: height,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.75,
    height: height,
    backgroundColor: config.tokens.colors.primary0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 40,
    opacity: 0.8,
  },
  drawerContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 5,
    paddingVertical: 8,
    marginVertical: 30,
  },
  draweContanier: {
    alignItems: 'center',
  },
  text: {
    lineHeight: 40,
  },
  logo: {
    width: width * 0.67,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 15,
    borderRadius: 50,
  },
  text1: {
    color: 'black',

    fontFamily: 'Poppins-Light',
    fontSize: 15,
  },
  pagesBox: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
  },
  flexy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 10,
    gap: 15,
  },
  iconStyle: {color: config?.tokens?.colors?.primaryM, fontSize: 18},
  singlePage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.65,
    gap: 10,
    paddingBottom: 8,
    paddingTop: 8,
    position: 'relative',
    paddingLeft: 15,
  },
  blur: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.6,

    borderRadius: 40,
  },
  pageText: {
    color: config?.tokens?.colors?.primaryM,
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
});

export default DrawerModal;
