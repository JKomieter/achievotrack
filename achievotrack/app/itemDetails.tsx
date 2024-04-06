import { View } from '../components/Themed';
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView, StyleSheet } from 'react-native';
import Product from '../layout/market/Product';
import RelatedItems from '../layout/market/RelatedItems';
import { MarketItem } from '../libs/types';
import viewDetailsStore from '../store/viewDetailsStore';
import getCart from '../utils/getCart';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function ItemsDetails() {
  const item = viewDetailsStore();
  const { mutate } = getCart();
  const [isLoading, setIsLoading] = useState(false);
  const [ relatedItems, setRelatedItems ] = useState<MarketItem[]>([]);

  const addItemToCart = useCallback(async (
    item: MarketItem
  ) => {
    setIsLoading(true)
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const userId = await AsyncStorage.getItem('userId');
    await axios.post(`${apiUrl}/addItemToCart`, { item, userId });
    await mutate();
    setIsLoading(false)
  }, [isLoading]);

  useEffect(() => {
    const getRelatedItems = async () => {
      const res = await axios.post(`${API_URL}/getRelatedItems`, { keywords: item.keywords, category: item.category, id: item.id});
      if (res.status == 200) {
        setRelatedItems(res.data);
      }
    }

    getRelatedItems();
  }, [item])


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Product item={item} addItemToCart={addItemToCart} isLoading={isLoading} />
        <RelatedItems relatedItems={relatedItems} />
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
        gap: 10,
    }
})