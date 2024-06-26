import { Review } from '@/libs/types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ReviewCard from './ReviewCard'
import { KeyedMutator } from 'swr'

export default function ReviewContent({
    reviews,
    mutate
}: {
    reviews: Review[],
    mutate: KeyedMutator<any>
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {
        reviews?.map((review, i) => (
          <ReviewCard key={review.id + review.userId + review.userName} review={review} mutate={mutate} />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        height: '100%',
        paddingHorizontal: 10
    }
})