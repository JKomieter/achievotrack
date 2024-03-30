import { View, Text } from '@/components/Themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar, Divider } from 'react-native-paper'
import { placeholder } from '@/constants/placeholder'
import { Entypo } from '@expo/vector-icons';
import ReviewStars from './ReviewStars'
import ReviewActions from './ReviewActions'
import { Review } from '@/libs/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export default function ReviewCard({
    review
}: {
    review: Review
}) {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        const userId = await AsyncStorage.getItem('userId');
        setLiked(!liked);
        await axios.post(`${process.env.EXPO_PUBLIC_DEV_BACKEND_URL}/likeReview`, {
            userId,
            reviewId: review.id
        });
    }

    useEffect(() => {
        const hasLiked = async () => {
            const userId = await AsyncStorage.getItem('userId');
            return review.likes.includes(userId as string);
        }
        hasLiked().then((res) => setLiked(res));
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={styles.user}>
                    <Avatar.Image size={33} source={{ uri: review.userProfilePic || placeholder }} />
                    <View style={styles.userInfo}>
                        <Text style={styles.name}>{review.userName}</Text>
                        <Text style={styles.time}>26 minutes ago</Text>
                    </View>
                </View>
                {/* <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity> */}
            </View>
            <Divider />
            <View style={styles.down}>
                <Text style={styles.course}>{review.course}, {review.instructor}</Text>
                <ReviewStars stars={3} />
                <Text style={styles.body}>
                    {review.body.slice(0, 200)}
                    {review.body?.length > 199 && '...'}
                </Text>
            </View>
            <Divider />
            <ReviewActions liked={liked} handleLike={handleLike} reviewId={review.id} commentsNum={review.commentsNum} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxHeight: 260,
        minHeight: 210,
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        display: "flex",
        flexDirection: "column",
    },
    top: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "100%",
        borderRadius: 25,
        flexDirection: "row"
    },
    user: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    name: {
        fontSize: 16,
        fontWeight: "400"
    },
    userInfo: {
        display: "flex",
        flexDirection: "column"
    },
    time: {
        fontSize: 14,
        fontWeight: "200"
    },
    down: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10,
    },
    course: {
        fontSize: 19,
        fontWeight: "600",
        width: "100%",
        textAlign: "center",
    },
    body: {
        fontSize: 12,
        fontWeight: "200"
    }
})