import { View, Text } from '@/components/Themed'
import MarketGoods from '@/layout/market/MarketGoods'
import SearchSection from '@/layout/market/SearchSection'
import { MarketItem } from '@/libs/types'
import getItems from '@/utils/getItems'
import searchItem from '@/utils/searchItem'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

export default function market() {
  const { data, isLoading } = getItems();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MarketItem[]>([]);

  useEffect(() => {
    if (query !== '') {
      const timerId = setTimeout(async () => {
        const results = await searchItem(query) as unknown as MarketItem[]; // Replace this with your search function
        setSearchResults(results);
      }, 900);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <SearchSection query={query} setQuery={setQuery} />
      <MarketGoods items={query !== '' ? searchResults : data} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
