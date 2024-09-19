import {
  Dimensions,
  GestureResponderEvent,
  Pressable,
  View,
  Image,
  ViewStyle,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { AvatarImage } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { Text } from '@gluestack-ui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { config } from '../../config/gluestack-ui.config';
import AntDesign from "react-native-vector-icons/AntDesign"
type Iprops = {
  name: string;
  phone: string;
  background: string;
  decription: string;
  color: string;
  onPress: () => void;
  hideIcons: boolean;
};
const { width } = Dimensions.get('window');
const MyWillCard: React.FC<Iprops> = ({
  name,
  phone,
  background,
  color,
  decription,
  onPress,
  hideIcons
}) => {
  return (
    <Pressable
      style={[
        styles.bannerContainer,
        { backgroundColor: background || 'white', width: width - 40 },
      ]}>
      <View style={styles.contactCardBox}>
        <View style={styles.cardProfileSection}>
          <Box>
            <Text fontSize={12} style={{ color: color }}>
              {phone}
            </Text>
            <Text
              fontSize={18}
              paddingTop={9}
              style={{ color: 'black', fontWeight: '600' }}>
              {name}
            </Text>
          </Box>
        </View>
        <Text
          fontSize={16}
          paddingTop={5}
          style={{ color: color }}
          paddingBottom={20}>
          {decription}
        </Text>
        {!hideIcons && <View style={styles.iconBox}>
          <View
            style={[
              styles.icon,
              { backgroundColor: config.tokens.colors.primaryM },
            ]}>
            <FontAwesome6
              name="location-arrow"
              style={{ color: config.tokens.colors.primary0 }}
            />
          </View>
        </View>}
      </View>
      {!hideIcons && <Pressable style={styles.delIcon} onPress={onPress} >
        <AntDesign name='delete' style={{ fontSize: 20, color: "red" }} />
      </Pressable>}
    </Pressable>
  );
};

export default MyWillCard;

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 8,
    borderRadius: 12,
    marginBottom: 10,
  },
  contactCardBox: {
    width: '100%',
    borderRadius: 10,
    padding: 12,
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
    justifyContent: 'flex-end',
    paddingVertical: 4,
    gap: 5,
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
  },
  delIcon: {
    position: "absolute",
    top: 10, right: 10,
    // backgroundColor: config.tokens.colors.linear,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
