import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { config } from '../../../config/gluestack-ui.config';
import { Block } from '../../components/App';
import MyWillCard from '../../utils/MyWillCard';
import { SelectMyWillScreenProps } from '../../types/NavigationTypes.types';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import uuid from 'react-native-uuid';
import {
    getWillsByUid,
} from '../../services/willServices/willServices';
import { WillsDataResponse } from '../../services/willServices/willServices.types';
import FloatingButton from '../../components/App/FloatingButton';
import SelectMyWillCard from '../../utils/SelectMyWillCard';
import { addSelectMyWill } from '../../services/SelectMyWill/SelectMyWillService';
import { Toast } from 'react-native-toast-notifications';

const SelectMyWill: React.FunctionComponent<SelectMyWillScreenProps> = ({ navigation, route }) => {
    const [wills, setWills] = useState<WillsDataResponse[]>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

    const contactNumber = route?.params?.phoneNumber;

    const handleToggleSelection = (index: string) => {
        const selectedIndex = selectedItems.indexOf(index);
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, index]);
        } else {
            const newSelectedItems = [...selectedItems];
            newSelectedItems.splice(selectedIndex, 1);
            setSelectedItems(newSelectedItems);
        }
    };

    const isSelected = (index: string) => selectedItems.includes(index);

    const userData = useSelector((state: StoreState) => state.user);
    const getWill = () => {
        getWillsByUid(userData.uid).then(data => setWills(data));
    };
    const addSelectedWills = () => {

        addSelectMyWill({ id: uuid.v4().toString(), selectedItems: selectedItems, contactNumber: contactNumber }).then(() => {
            Toast.show('Wills Added Successfully ', { type: 'success' });
            setSelectedItems([]);
        }).catch((err) => {
            Toast.show('Error in Logout ', { type: 'error' });

        })

    }

    useEffect(() => {
        getWill();
    }, [navigation]);



    return (
        <React.Fragment>
            <Block
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: 90,
                }}>
                <>
                    {wills.map((item, index) => {
                        let bg = config.tokens.colors.linear;
                        let color = 'grey';
                        return (
                            <SelectMyWillCard
                                color={color}
                                key={index}
                                background={bg}
                                phone={item.datetime}
                                name={item.title}
                                isSelected={isSelected(item.id)}
                                decription={item.description}
                                onPress={() => handleToggleSelection(item.id)}
                            />
                        );
                    })}
                </>
            </Block>
            <FloatingButton
                onPress={() => addSelectedWills()}
                bottom={50}
                icon="note-plus"
            />
        </React.Fragment>
    );
};

export default SelectMyWill;

const styles = StyleSheet.create({});
