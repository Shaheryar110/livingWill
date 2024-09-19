import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';
import {config} from '../../config/gluestack-ui.config';

type IProps = {
  text: String;
  color: String;
  bg: ColorValue;
  onPress: () => void;
};

const Button: React.FC<IProps> = ({text, color, bg, onPress}) => {
  return (
    <Pressable onPress={onPress} style={[styles.btn, {backgroundColor: bg}]}>
      <Text
        style={
          {
            textAlign: 'center',
            fontSize: 15,
            color: color,
          } as StyleProp<TextStyle>
        }>
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    width: 331,
    height: 55,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginBottom: 20,
  },
});
