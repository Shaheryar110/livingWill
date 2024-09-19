import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Block } from '../../components/App'
import SingleContactHeader from './SingleContactHeader'
import { getWillsByPhoneNumber } from '../../services/SelectMyWill/SelectMyWillService'
import { SingleContactScreenProps } from '../../types/NavigationTypes.types'
import { config } from '../../../config/gluestack-ui.config'
import MyWillCard from '../../utils/MyWillCard'

const initial = {
    name: "",
    number: "",
    img: ""
}

const SingleContact: React.FC<SingleContactScreenProps> = ({ route }) => {
    const [user, setUser] = useState(initial);
    const [data, setData] = useState<Array<any>>([])
    useEffect(() => {
        setUser({
            name: route.params.fullname,
            number: route.params.phoneNumber,
            img: route.params.source || ""
        })
        getWillsByPhoneNumber(route.params.phoneNumber).then((data) => setData(data)).catch(() => {

        })
    }, [route]);


    return (
        <Block
            source={require('../../../assets/Images/Capture.png')}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 110,


            }}
            paddingBottom={70}
        >
            <SingleContactHeader img={route.params.source || ''} name={user?.name} phone={user?.number} />
            <View>
                {data && data?.map((item, index) => {
                    let bg = config.tokens.colors.linear;
                    let color = 'grey';
                    return (
                        <MyWillCard
                            color={color}
                            key={index}
                            background={bg}
                            phone={item?.datetime}
                            name={item.title}
                            decription={item.description}
                            hideIcons={true}
                            onPress={() => {
                                //   deleteContact(item.id);
                            }}
                        />
                    );
                })}
            </View>

        </Block>
    )
}

export default SingleContact

