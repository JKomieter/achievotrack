import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { ListCongratsSvg } from '@/assets/svgs'

export default function ListCongratulations() {
  return (
    <View style={styles.container}>
      <SvgXml xml={ListCongratsSvg} width={400} height={400} />
      <Text style={styles.txt}>
        Congratulations! You have successfully listed your item.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20
    },
    txt: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontWeight: '300',
        paddingHorizontal: 20
    }
})