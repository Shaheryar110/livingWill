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

type Iprops = {
  src: string;
  name: string;
  phone: string;
  background: string;
  color: string;
  width?: number;
  relation: string;
  onClickSend?: () => void;
  viewContactDetails?: () => void;
};

const ContactCard: React.FC<Iprops> = ({
  src,
  name,
  phone,
  background,
  color,
  width,
  relation,
  onClickSend,
  viewContactDetails
}) => {
  return (
    <Pressable
      style={[
        styles.bannerContainer,
        { backgroundColor: background || 'white', width: width || 250 },
      ]} onPress={viewContactDetails} >
      <View style={styles.contactCardBox}>
        <View style={styles.cardProfileSection}>
          <Avatar>
            <AvatarImage
              source={{
                uri: src,
              }}
              alt="ops"
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          </Avatar>
          <Box>
            <Text fontSize={18} paddingBottom={2} style={{ color: color }}>
              {name}
            </Text>
            <Text fontSize={16} style={{ color: color }}>
              {phone}
            </Text>
          </Box>
        </View>
        <Text
          fontSize={16}
          paddingTop={10}
          style={{ color: color }}
          paddingBottom={20}>
          {relation}
        </Text>
        <View style={styles.iconBox}>
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name="phone-log"
              style={{ color: config.tokens.colors.primary0 }}
            />
          </View>
          <Pressable style={styles.icon} onPress={onClickSend}>
            <FontAwesome6
              name="location-arrow"

              style={{ color: config.tokens.colors.primary0 }}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  bannerContainer: {
    marginHorizontal: 8,
    borderRadius: 12,
  },
  contactCardBox: {
    width: '100%',
    borderRadius: 10,
    padding: 22,
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
  },
});
