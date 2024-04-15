import { View, Text } from '@/components/Themed'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Portal, Dialog, PaperProvider } from 'react-native-paper';
import { FeedbackSvg } from '@/assets/svgs';
import { SvgXml } from 'react-native-svg';
import { DefaultTheme } from '@react-navigation/native';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

const DialogComponent = ({
    hideDialog,
    visible,
    showDialog,
}: {
    hideDialog: () => void,
    visible: boolean,
    showDialog: () => void
}) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} theme={DefaultTheme}>
                <Dialog.Title>
                    <TouchableOpacity onPress={() => hideDialog()}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </Dialog.Title>
                <Dialog.Content>
                        <SvgXml xml={FeedbackSvg} width={300} height={300} />
                        <Text style={styles.thanks}>
                            Thank you for your feedback! We appreciate it.
                        </Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default function Feedback() {
    const arr = new Array(5).fill(0).map((_, i) => i + 1);
    const [stars, setStars] = useState(0);
    const [feedback, setFeedback] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const userId = await AsyncStorage.getItem('userId');
            const res = await axios.post(`${API_URL}/addFeedback`, {
                stars,
                feedback,
                userId
            })
            console.log(res.data)
            if (res.data.message) {
                setStars(0)
                setFeedback('')
                showDialog()
            }
        } catch (error) {
            console.log(error)
        } finally { setIsLoading(false) }
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <View style={styles.miniContainer}>
                    <Text style={styles.text}>
                        How would you rate your experience?
                    </Text>
                    <View style={styles.stars}>
                        {arr.map((i) => (
                            <TouchableOpacity key={i} onPress={() => setStars(i)}>
                                {
                                    i <= stars ? <AntDesign name="star" size={40} color="#FFD700" key={i} /> : <AntDesign name="staro" size={40} color="black" key={i} />
                                }
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={styles.miniContainer}>
                    <Text style={styles.text}>
                        Do you have any thoughts you'd like to share?
                    </Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        placeholder='Type your message here...'
                        value={feedback}
                        onChangeText={setFeedback}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                        {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.btnText}>Submit</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            <DialogComponent showDialog={showDialog} hideDialog={hideDialog} visible={visible} />
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    miniContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stars: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '400'
    },
    input: {
        width: '90%',
        borderColor: '#bcbcbc',
        borderWidth: 0.5,
        borderRadius: 30,
        height: 120,
        padding: 20
    },
    btn: {
        backgroundColor: '#d12323',
        padding: 15,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '90%'
    },
    btnContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17
    },
    thanks: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '600'
    }
})