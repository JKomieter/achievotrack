import { View, Text } from '@/components/Themed'
import { MarketItem } from '@/libs/types'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import viewDetailsStore from '@/store/viewDetailsStore'

const placeholder = 'https://archive.org/download/placeholder-image//placeholder-image.jpg'

export default function RelatedItemCard({
    item
}: {
    item: MarketItem
}) {
    const router = useRouter();
    const { setViewDetails } = viewDetailsStore()

    const openDetails = () => {
        setViewDetails(
            item.id,
            item.title,
            item.description,
            item.images,
            item.sellerId,
            item.sellerName,
            item.sellerEmail,
            item.sellerPhone.toString(),
            item.price,
            item.category,
            item.createdAt,
            item.keywords
        )
        router.push('/itemDetails');
    }

  return (
    <View style={styles.container}>
          <View style={styles.imgContainer}>
              {item?.images?.length > 0 &&
                  <Image source={{
                      uri: `data:image/jpeg;base64,${item?.images[0]}` || placeholder }} style={{ width: "100%", height: "100%" }} contentFit='cover' placeholder='' />
              }
          </View>
          <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description.slice(0, 40)}...</Text>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.btn} onPress={() => openDetails()}>
                  <Text style={styles.btnText}>View Details</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 350,
        borderRadius: 25,
        borderColor: '#f2f2f2',
        borderWidth: 3,
        marginLeft: 20
    },
    imgContainer: {
        width: '100%',
        height: '60%',
        borderRadius: 25,
        overflow: 'hidden'
    },
    info: {
        padding: 10
    },
    title: {
        fontWeight: '500',
        fontSize: 18
    },
    desc: {
        fontWeight: '200'
    },
    price: {
        fontSize: 15,
        fontWeight: '500'
    },
    btn: {
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: '#848383',
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16
    }
})
