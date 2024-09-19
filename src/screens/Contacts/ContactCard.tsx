import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { config } from '../../../config/gluestack-ui.config';
import AntDesign from "react-native-vector-icons/AntDesign"

type Iprops = {
  img: string;
  phone: string;
  name: string;
  desc: string;
  onClick: () => void;
  onPress: () => void;
};
const { width } = Dimensions.get('window');

const ContactCard: React.FC<Iprops> = ({ img, phone, name, desc, onClick, onPress }) => {
  return (
    <View style={styles.parentBox}>
      <View style={styles.contactBox}>
        <Image
          source={{ uri: img }}
          style={styles.image}
        />
        <View style={{ alignSelf: 'center' }}>
          <Text onPress={onClick} style={styles.name}>
            {name}
          </Text>
          <Text style={styles.phone}>{phone}</Text>
          <Text style={{ marginTop: 1, color: 'white', fontSize: 16 }}>{desc}</Text>

        </View>
      </View>
      <Pressable style={styles.delIcon} onPress={onPress} >
        <AntDesign name='delete' style={{ fontSize: 20, color: "red" }} />
      </Pressable>
    </View>
  );
};

export default ContactCard;

const styles = StyleSheet.create({
  parentBox: {
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: width - 20,
    position: "relative"
  },
  contactBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    fontWeight: '600',
  },
  phone: {
    fontWeight: '600',
    color: 'white',
    fontSize: 20,
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
