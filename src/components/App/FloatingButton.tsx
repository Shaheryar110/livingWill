import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {config} from '@gluestack-ui/config';
type IProps = {
  onPress: () => void;
  bottom: number;
  icon: string;
};

const FloatingButton: React.FunctionComponent<IProps> = ({
  onPress,
  bottom,
  icon,
}) => {
  const [showText, setShowText] = useState(false);
  const fabWidth = useRef(new Animated.Value(55)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fabAmination = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fabWidth, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
      delay: 4000,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      fadeIn();
      setShowText(true);
      fabAminationReverse();
    });
  };
  const fabAminationReverse = () => {
    setTimeout(() => {
      setShowText(false);
    }, 3900);
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fabWidth, {
      toValue: 55,
      duration: 500,
      useNativeDriver: false,
      delay: 4000,
      easing: Easing.in(Easing.ease),
    }).start(() => {
      fabAmination();
    });
  };

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fabAmination();
  }, []);
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.contanier,
          {
            width: fabWidth,
            paddingHorizontal:
              Platform.OS === 'ios' ? (showText ? 20 : 18) : showText ? 22 : 18,
            bottom: bottom,
          },
        ]}>
        <MaterialCommunityIcons
          name={icon}
          color={config.tokens.colors.white}
          size={20}
          style={{}}
        />
        {showText && (
          <Animated.Text style={[styles.fabText, {opacity: fadeAnim}]}>
            Add New
          </Animated.Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  contanier: {
    position: 'absolute',
    right: 30,
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 60,
    height: 55,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  fabItem: {},
  fabText: {
    fontSize: 18,
    fontWeight: '500',
    color: config.tokens.colors.white,
    marginLeft: 10,
  },
});
