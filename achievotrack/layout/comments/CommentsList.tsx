import { View, Text } from '@/components/Themed'
import { placeholder } from '@/constants/placeholder'
import { Comment } from '@/libs/types'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { useUserId } from '@/hooks/useUserId'

export default function CommentsList({
    comments,
    handleLikeComment
}: {
    comments: Comment[],
    handleLikeComment: (commentId: string) => void
}) {
    const handleDuration = (timestamp: any) => {
        const milliseconds = (timestamp.seconds * 1000) + (timestamp.nanoseconds / 1000000);
        const date = new Date(milliseconds);
        return formatDistanceToNow(date, { addSuffix: true });
    }

    const hasLiked = (likes: string[]) => {
        const userId = useUserId()
        return likes.includes(userId as string);
    }


    return (
        <View style={styles.conatiner}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', height: '100%' }}>
                {
                    comments?.length > 0 ? <>
                        {
                            comments?.map((comment) => (
                                <View key={comment.id} style={styles.comment}>
                                    <Avatar.Image source={{ uri: placeholder}} size={30} />
                                    <View style={styles.body}>
                                        <Text style={styles.date}>{handleDuration(comment.createdAt)}</Text>
                                        <Text style={styles.bodyText}>{comment.body}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleLikeComment(comment.id)} style={styles.like}>
                                        <AntDesign name={ hasLiked(comment.likes) ? "heart" : "hearto"} size={20} color="#585858" />
                                        <Text style={styles.date}>{comment.likes?.length || 0}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </> : 
                    <View style={styles.noComments}>
                        <Text style={styles.noCommentsTxt}>
                            No Comments
                        </Text>
                    </View>
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    conatiner: {
        width: '100%',
        padding: 20
    },
    noComments: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCommentsTxt: {
        fontSize: 20,
        fontWeight: '500',
        color: '#a3a3a3'
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '80%'
    },
    date: {
        fontSize: 12,
        fontWeight: '300',
        color: '#a3a3a3'
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '300',
    },
    like: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})