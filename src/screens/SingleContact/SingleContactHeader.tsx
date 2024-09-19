import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, YellowBox } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box } from '@gluestack-ui/themed';
import { config } from '../../../config/gluestack-ui.config';
const { width } = Dimensions.get('window');
type Iprops = {
    img: string;
    name: string;
    phone: string;
}

const SingleContactHeader: React.FC<Iprops> = ({ img, name, phone }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <View
                style={[
                    styles.blur,
                    { backgroundColor: '#29ABE2' },
                ]}
            />

            <MaterialCommunityIcons
                onPress={() => {
                    navigation.goBack();

                }}
                name={'keyboard-backspace'}
                style={{ fontSize: 33, color: 'white' }}
            />
            <Image
                source={{ uri: img || "https://firebasestorage.googleapis.com/v0/b/livingwill-b6abe.appspot.com/o/user.jfif?alt=media&token=410621b4-1856-4194-b7e5-133c58655282" }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25
                }}
            />
            <View>
                <Text style={[styles.text, { textTransform: "uppercase", fontWeight: "600" }]}>{name}</Text>
                <Text style={styles.text}>{phone}</Text>
            </View>


            <Box alignItems="flex-start">

            </Box>
        </View>
    )
}

export default SingleContactHeader

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        position: 'absolute',
        top: 0,
        paddingHorizontal: 14,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    box: {},
    text: {
        fontSize: 18,
        color: config.tokens.colors.primary0,
    },
    blur: {
        paddingVertical: 39,
        position: 'absolute',
        top: 0,
        backgroundColor: config.tokens.colors.secondary,
        flexDirection: 'row',

        opacity: 0.5,
        zIndex: -1,
        width: width,
    },
});