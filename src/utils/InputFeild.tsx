import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import React from 'react';
import {config} from '../../config/gluestack-ui.config';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
type IProps = {
  placeholder: string;
  icon: number;
  showSearch?: Boolean;
  value?: string;

  onChangeText?: (text: string) => void;
  height?: number;
  onPressSearch?: () => void;
};
const iconMapping = [
  <FontAwesome6
    name="user-large"
    style={{fontSize: 16, color: '#29ABE2', alignSelf: 'center'}}
  />,
  <MaterialCommunityIcons
    name="email"
    style={{fontSize: 16, color: '#29ABE2', alignSelf: 'center'}}
  />,
  <Fontisto
    name="phone"
    style={{
      fontSize: 16,
      color: '#29ABE2',
      alignSelf: 'center',

      transform: [{rotate: '110deg'}],
    }}
  />,
  <Entypo
    name="lock"
    style={{fontSize: 16, color: '#29ABE2', alignSelf: 'center'}}
  />,
];
const InputFeilds: React.FC<IProps> = ({
  placeholder,
  icon,
  showSearch,
  value,
  onChangeText,
  height,
  onPressSearch,
}) => {
  return (
    <View style={[styles.box, {height: height || 50}]}>
      {!showSearch && iconMapping[icon]}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={config.tokens.colors.secondary}
        style={styles.feild}
      />
      {showSearch && (
        <FontAwesome5
          onPress={onPressSearch}
          name="search"
          style={{
            fontSize: 16,
            color: '#29ABE2',
            position: 'absolute',
            right: 20,
            top: 15,
            bottom: 0,
          }}
        />
      )}
    </View>
  );
};

export default InputFeilds;

const styles = StyleSheet.create({
  box: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 0,
    borderRadius: 40,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
    backgroundColor: config.tokens.colors.linear,
    opacity: 0.9,
    paddingLeft: 16,
    position: 'relative',
    elevation: 1,
  },
  feild: {
    fontWeight: '600',
    marginLeft: 10,
    width: '100%',
    alignSelf: 'center',
  },
});
