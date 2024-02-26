import Product from '@/layout/market/Product'
import { View } from '@/components/Themed'
import DetailsImage from '@/layout/market/DetailsImage'
import ProductInfo from '@/layout/market/ProductInfo'
import RelatedItems from '@/layout/market/RelatedItems'
import React, { useCallback, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import viewDetailsStore from '@/store/viewDetailsStore'
import { MarketItem } from '@/libs/types'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getCart from '@/utils/getCart'

export default function itemzDetails() {
  const item = viewDetailsStore();
  const { mutate } = getCart();
  const [isLoading, setIsLoading] = useState(false);

  const addItemToCart = useCallback(async (
    item: MarketItem
  ) => {
    setIsLoading(true)
    const apiUrl = process.env.DEV_BACKEND_URL;
    const userId = await AsyncStorage.getItem('userId');
    await axios.post(`${apiUrl}/addItemToCart`, { item, userId });
    await mutate();
    setIsLoading(false)
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Product item={item} addItemToCart={addItemToCart} isLoading={isLoading} />
        <RelatedItems />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
    }
})