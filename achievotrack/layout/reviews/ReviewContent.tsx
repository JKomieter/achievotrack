import { Review } from '@/libs/types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ReviewCard from './ReviewCard'

export default function ReviewContent({
    reviews
}: {
    reviews: Review[]
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {
        reviews?.map((review, i) => (
          <ReviewCard key={review.comments + review.createdAt.toString()} review={review} />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 5
    }
})