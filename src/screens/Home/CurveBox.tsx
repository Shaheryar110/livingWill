import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Heading } from '@gluestack-ui/themed';
import { config } from '../../../config/gluestack-ui.config';
type IProps = {
    uri: string;
    text: string;
    onPressSearch: () => void;
}
const CurveBox: React.FC<IProps> = ({ uri, text, onPressSearch }) => {
    return (
        <Pressable onPress={onPressSearch} >
            <View style={styles.Box} >
                <Image
                    source={{
                        uri: uri,
                    }}
                    alt='oops'
                    style={{ width: 20, height: 20 }}
                />

                <Text style={{ color: config.tokens.colors.primary0 }} >{text}</Text>
            </View>
        </Pressable>
    )
}

export default CurveBox

const styles = StyleSheet.create({
    Box: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        height: 60,
        width: 115,
        backgroundColor: config.tokens.colors.linear,
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingHorizontal: 5,
        gap: 10,
        marginHorizontal: 5


    }
})