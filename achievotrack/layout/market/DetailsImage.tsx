import { View } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'expo-image'

export default function DetailsImage({
  images
}: {
  images: string[]
}) {
  return (
    <View style={styles.imgContainer}>
      <Image source={{uri: images[0]}} style={{ width: "100%", height: "100%" }} contentFit='cover' />
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    height: 300,
    overflow: 'hidden',
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  }
})