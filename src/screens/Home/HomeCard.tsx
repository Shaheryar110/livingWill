import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {config} from '../../../config/gluestack-ui.config';
import {Center, Heading} from '@gluestack-ui/themed';
type IProps = {
  uri: string;
  text: string;
  onPress?: () => void;
};

const HomeCard: React.FC<IProps> = ({uri, text, onPress}) => {
  return (
    <Pressable onPress={onPress} style={{alignItems: 'center'}}>
      <View style={styles.Box}>
        <Image
          source={{
            uri: uri,
          }}
          alt="oops"
          style={{width: 50, height: 50}}
        />
      </View>
      <Heading
        style={{
          marginTop: 2,
          color: config.tokens.colors.primary0,
          textAlign: 'center',
        }}>
        {text}
      </Heading>
    </Pressable>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  Box: {
    borderRadius: 10,
    height: 110,
    width: 110,
    backgroundColor: config.tokens.colors.linear,

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
