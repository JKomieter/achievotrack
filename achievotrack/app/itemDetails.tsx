import { View, Text } from '../components/Themed';
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView, StyleSheet } from 'react-native';
import Product from '../layout/market/Product';
import RelatedItems from '../layout/market/RelatedItems';
import { MarketItem } from '../libs/types';
import viewDetailsStore from '../store/viewDetailsStore';
import getCart from '../utils/getWishlist';
import { Button, Dialog, PaperProvider, Portal } from 'react-native-paper';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

const ConfirmShowInterest = ({
  visible,
  hideDialog,
}: {
  visible: boolean,
  hideDialog: () => void
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Interest</Dialog.Title>
        <Dialog.Content>
          <Text>
            The seller will be notified of your interest in this item.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default function ItemsDetails() {
  const item = viewDetailsStore();
  const { mutate } = getCart();
  const [addLoading, setaddLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [relatedItems, setRelatedItems] = useState<MarketItem[]>([]);
  const [showInterestDialog, setShowInterestDialog] = useState(false);

  const addItemToWishlist = useCallback(async (
    item: MarketItem
  ) => {
    setaddLoading(true)
    try {
      const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
      const userId = await AsyncStorage.getItem('userId');
      await axios.post(`${apiUrl}/addItemToWishlist`, { itemId: item.id, userId });
      await mutate();
    } catch (error) {
      console.log(error)
    } finally {
      setaddLoading(false)
    }
  }, [addLoading]);

  const showInterest = useCallback(async (
    item: MarketItem
  ) => {
    setInterestLoading(true)
    try {
      const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
      const userId = await AsyncStorage.getItem('userId');
      console.log(apiUrl, userId, item.id)
      await axios.post(`${apiUrl}/showItemInterest`, { itemId: item.id, userId });
      setShowInterestDialog(true);
      await mutate();
    } catch (error) {
      console.log(error)
    } finally {
      setInterestLoading(false)
    }
  }, [interestLoading]);

  useEffect(() => {
    const getRelatedItems = async () => {
      const res = await axios.post(`${API_URL}/getRelatedItems`, { keywords: item.keywords, category: item.category, id: item.id });
      if (res.status == 200) {
        setRelatedItems(res.data);
      }
    }

    getRelatedItems();
  }, [item])


  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <Product item={item} addItemToWishlist={addItemToWishlist} addLoading={addLoading} interestLoading={interestLoading} showInterest={showInterest} />
          <RelatedItems relatedItems={relatedItems} />
        </ScrollView>
      </View>
      <ConfirmShowInterest visible={showInterestDialog} hideDialog={() => setShowInterestDialog(false)} />
    </PaperProvider>
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