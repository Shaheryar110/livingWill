import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Block } from '../../components/App'
import { Rating, AirbnbRating } from 'react-native-ratings';
import InputFeilds from '../../utils/InputFeild';
import Button from '../../utils/Button';
import { config } from '../../../config/gluestack-ui.config';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux/reduxStore';
import { addFeedback } from '../../services/FeedbackService/feedbackServices';
import { Toast } from 'react-native-toast-notifications';
import uuid from 'react-native-uuid';
import FeedbackModal from '../../utils/FeedbackModal';
const initial = {
    rating: 1,
    desc: ""
}
const Index = () => {
    const [Feedback, setFeedback] = useState(initial);
    const [show, setShow] = useState(false);
    const userData = useSelector((state: StoreState) => state.user);
    const handleChange = (key: string, val: string | number) => {
        setFeedback((prev) => ({ ...prev, [key]: val }))
    }
    const publish = async () => {
        const { desc, rating } = Feedback;
        if (!desc || rating == 1) {
            Toast.show("Please Fill All Feilds", {
                type: "error"
            })
        } else {
            try {
                const resp = await addFeedback({
                    uid: userData.uid,
                    description: desc,
                    id: String(uuid.v4()),
                    rating: rating,
                });
                if (resp) {
                    Toast.show('Contact Form Added', {
                        type: 'success',
                    });
                    setFeedback(initial)
                    setShow(true)

                } else {
                    Toast.show('Failed to add contact form', {
                        type: 'error',
                    });
                }
            }
            catch (error) {
                console.error('Error adding contact form:', error);
                Toast.show('An error occurred', {
                    type: 'error',
                });
            }
        }

    }
    return (
        <Block source={require('../../../assets/Images/Capture.png')}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 150,
                paddingHorizontal: 30
            }}
            paddingBottom={100}>
            <Text style={styles.question} >How Did We Do?</Text>
            <AirbnbRating onFinishRating={(e) => { handleChange('rating', e) }} size={20} ratingContainerStyle={{ width: "100%", alignSelf: "flex-start", display: "flex", justifyContent: "flex-start" }} starContainerStyle={{ width: "100%", alignSelf: "flex-start", marginTop: 9, display: "flex", justifyContent: "flex-start" }} count={5} showRating={false} />
            <InputFeilds
                placeholder="How Did We Do?"
                icon={4}
                height={120}
                value={Feedback.desc}
                onChangeText={txt => handleChange('desc', txt)}

            />
            <View style={{ marginTop: 10 }}>
                <Button
                    onPress={() => {
                        publish();
                    }}
                    text="Publish Feedback"
                    color={config.tokens.colors.primary0}
                    bg={config.tokens.colors.primaryM}
                />
            </View>
            <FeedbackModal show={show} setShow={setShow} />
        </Block>
    )
}

export default Index;

const styles = StyleSheet.create({
    question: {
        color: "white",
        fontWeight: "500",
        textAlign: "left",
        width: "100%",
        fontSize: 18
    }
})
