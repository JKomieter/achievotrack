import { View } from '@/components/Themed'
import { placeholder } from '@/constants/placeholder'
import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCommentStore from '@/store/useCommentStore'
import axios from 'axios'
import getReviews from '@/utils/getReviews'
import { KeyedMutator } from 'swr'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function CommentAction({
    mutate
}: {
    mutate: KeyedMutator<any>
}) {
    const [comment, setComment] = useState('');
    const { reviewId } = useCommentStore();

    const handleComment = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const data = {
                userId,
                reviewId,
                body: comment
            }
            const res = await axios.post(`${API_URL}/commentOnReview`, data);
            if (res.status === 200) {
                setComment('');
                mutate();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.comment}>
                <View>
                    <Avatar.Image source={{ uri: placeholder }} size={30} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Add comment for this review' value={comment} onChangeText={setComment} />
                    <TouchableOpacity style={styles.send} onPress={() => handleComment()}>
                        <FontAwesome6 name="square-arrow-up-right" size={30} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
        bottom: 0,
        borderTopWidth: 0.2,
        borderColor: '#676767',
        position: 'absolute',
        marginBottom: 20
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden'
    },
    inputContainer: {
        height: 50,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '90%',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    input: {
        height: '100%',
        borderRadius: 30,
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
        width: '85%',
        zIndex: -1
    },
    send: {
        zIndex: 1000,
    }
})