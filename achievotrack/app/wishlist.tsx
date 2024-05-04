import { View, Text } from '@/components/Themed'
import { MarketItem } from '@/libs/types'
import viewDetailsStore from '@/store/viewDetailsStore'
import getWishlist from '@/utils/getWishlist'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { KeyedMutator } from 'swr'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

const Product = ({ item, mutate }: { item: MarketItem, mutate: KeyedMutator<any> }) => {
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

  const removeItem = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      await axios.post(`${API_URL}/removeItemFromWishlist`, {userId, itemId: item.id})
      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TouchableOpacity onPress={() => openDetails()}>
      <View style={styles.box}>
        <View style={styles.productContainer}>
          <View style={styles.img}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.images[0]}` }} style={{ width: '100%', height: '100%' }} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description.slice(0, 30)}{item.description?.length > 30 && '...'}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeItem()}>
          <AntDesign name="closecircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default function Wishlist() {
  const { data, mutate } = getWishlist() as { data: MarketItem[], mutate: KeyedMutator<any> }

  return (
    <View style={styles.container}>
      {
        data && data?.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContainer}>
              {
                data.map((item, index) => (
                  <Product key={index} item={item} mutate={mutate} />
                ))
              }
            </View>
          </ScrollView>
        ) : (
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <MaterialCommunityIcons name="bucket-outline" size={100} color="#d12323" />
            <Text style={{ fontSize: 20, fontWeight: '500' }}>No items in your wishlist</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 15,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    backgroundColor: "#f0f0f0",
    shadowRadius: 3,
    padding: 10,
    borderRadius: 20,
  },
  productContainer: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-start',
    shadowColor: '#171717',
    backgroundColor: "#f0f0f0",
  },
  img: {
    width: 80,
    height: 80,
    overflow: 'hidden',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '400',
  },
  desc: {
    fontSize: 14,
    fontWeight: '300',
  }
})

