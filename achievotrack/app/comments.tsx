import { View } from '@/components/Themed'
import CommentAction from '@/layout/comments/CommentAction'
import CommentsList from '@/layout/comments/CommentsList'
import useCommentStore from '@/store/useCommentStore'
import getReviewComments from '@/utils/getReviewComments'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React from 'react'
import { StyleSheet } from 'react-native'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function Comments() {
  const { reviewId } = useCommentStore()
  const { data, mutate } = getReviewComments(reviewId);

  const handleLikeComment = async (commentId: string) => {
    const userId = await AsyncStorage.getItem('userId');
    const res = await axios.post(`${API_URL}/likeReviewComment`, {
      userId,
      commentId,
      reviewId
    })
    if (res.status === 200) mutate();
  }
  
  return (
    <View style={styles.container}>
      <CommentsList comments={data} handleLikeComment={handleLikeComment} />
      <CommentAction mutate={mutate} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})