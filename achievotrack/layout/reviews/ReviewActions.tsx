import { View, Text } from '@/components/Themed'
import React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import useCommentStore from '@/store/useCommentStore';

export default function ReviewActions({
    liked,
    handleLike,
    reviewId,
    commentNum,
    numLikes
}: {
    liked: boolean,
    handleLike: () => void,
    reviewId: string,
    commentNum: number,
    numLikes: number
}) {
    const { setReviewId } = useCommentStore()

    const actions = [
        {
            name: "like",
            icon: <AntDesign name="like1" size={24} color={liked ? "#000000" : "#bebebe"} />,
            action: () => handleLike(),
            num: numLikes
        },
        {
            name: "comment",
            icon: <FontAwesome name="commenting" size={24} color="#bebebe" />,
            action: () => {
                setReviewId(reviewId)
                router.push('/comments')
            },
            num: commentNum
        },
        // {
        //     name: "share",
        //     icon: <FontAwesome name="paper-plane" size={24} color="#bebebe" />,
        //     action: () => { }
        // }
    ]

    return (
        <View style={styles.container}>
            {
                actions.map((act) => (
                    <TouchableOpacity key={act.name} onPress={act.action} style={styles.action}>
                        {act.icon}
                        <Text style={styles.num}>{act.num || 0}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: "flex",
        alignItems: "center",
        gap: 25,
        flexDirection: "row",
        borderRadius: 30,
    },
    action: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        flexDirection: "row",
        alignContent: "center"
    },
    num: {
        fontSize: 12,
        fontWeight: "200"
    }
})