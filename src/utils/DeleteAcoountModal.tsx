import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { config } from '../../config/gluestack-ui.config';
import { firebase } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { StoreDispatch, StoreState } from '../redux/reduxStore';
import { userActions } from '../redux/user/slice';
type Iprops = {
    deleteModal: boolean;
    setDeleteModal: (e: boolean) => void;

};

const DeleteAccModal: React.FC<Iprops> = ({
    deleteModal,
    setDeleteModal,

}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const userData = useSelector((state: StoreState) => state.user);
    const deleteFunc = () => {
        firebase.auth().currentUser?.delete().then(() => {
            console.log('done');

            dispatch(
                userActions.setUser({
                    email: '',
                    phone: '',
                    fullName: '',
                    isPrimium: false,
                    creationTime: 0,
                    uid: "",
                }),
            );


        }).catch((err) => {
            console.log(err);

        });
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={deleteModal}
            onRequestClose={() => {
                setDeleteModal(!deleteModal);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textStyle1}>Are your Sure ?</Text>
                    <Text style={styles.textStyle0}>If your delete your account your all information will be removed</Text>


                    <View style={{ width: "100%" }} >
                        <Pressable
                            style={[styles.button, { backgroundColor: config.tokens.colors.primaryM, marginBottom: 5, width: 200 }]}
                            onPress={() => deleteFunc()}>
                            <Text style={styles.textStyle}>Yes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, { backgroundColor: "red", width: 200 }]}
                            onPress={() => setDeleteModal(!deleteModal)}>
                            <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

export default DeleteAccModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        position: 'relative',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    new: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 30,
    },
    button: {
        borderRadius: 30,
        padding: 10,
        elevation: 2,
        color: config.tokens.colors.linear,
        width: "100%"

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: config.tokens.colors.primaryM,
        position: 'absolute',
        right: 50,
        bottom: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyle1: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 15,
    },
    textStyle0: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 15,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    pickUpBox: {
        width: 80,
        height: 80,
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: config.tokens.colors.secondary,
    },
});
