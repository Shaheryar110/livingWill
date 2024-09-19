import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { config } from '../../config/gluestack-ui.config';
type Iprops = {
    show: boolean;
    setShow: (e: boolean) => void;
}
const FeedbackModal: React.FC<Iprops> = ({ show, setShow }) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"

                transparent={true}
                visible={show}

                onRequestClose={() => {
                    setShow(!show);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.cancelBox} ><Entypo onPress={() => {
                            setShow(false)
                        }} name='cross' style={{ fontSize: 17 }} /></View>
                        <Image
                            source={require('../../assets/Images/living-will.png')}
                            style={styles.logo}
                        />
                        <Image
                            source={require('../../assets/Images/pic.png')}
                            style={styles.doc}
                        />
                        <Text style={{ fontWeight: "900", fontSize: 22, color: "black", marginVertical: 5, fontFamily: "Poppins-Medium" }} >Thank You !</Text>
                        <Text style={{ marginVertical: 5, fontSize: 15, textAlign: "center", fontFamily: "Poppins-Regular" }} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnio ametmolestiae vel.</Text>
                        <View style={{ margin: 10, alignSelf: "flex-start" }}>
                            <Pressable onPress={() => {
                                setShow(!show)
                            }} style={[styles.btn, { backgroundColor: config.tokens.colors.primaryM }]}>
                                <Text
                                    style={
                                        {
                                            textAlign: 'center',
                                            fontSize: 15,
                                            color: config.tokens.colors.primary0,
                                        }
                                    }>
                                    Publish Feddback
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 35,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
        width: "80%",
        position: "relative"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    logo: {
        width: 250,
        height: 56,
        marginTop: 10,
        marginBottom: 4,
    },
    btn: {
        width: 270,
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
    doc: {
        marginVertical: 10,
        width: 150,
        height: 130
    },
    cancelBox: {
        position: "absolute",
        right: 20,
        top: 15,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 13,
        width: 26,
        height: 26,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default FeedbackModal;