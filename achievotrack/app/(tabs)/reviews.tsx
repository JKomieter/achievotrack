import { View } from '../../components/Themed'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import ReviewContent from '../../layout/reviews/ReviewContent'
import ReviewSearch from '../../layout/reviews/ReviewSearch'
import WriteReview from '../../layout/reviews/WriteReview'
import { Review } from '../../libs/types'
import getReviews from '@/utils/getReviews'
import searchReviews from '@/utils/searchReviews'

export default function Reviews() {
    const [ query, setQuery ] = useState('');
    const { data, mutate } = getReviews();
    const [ reviews, setReviews ] = useState<Review[]>([]);

    useEffect(() => {
        if (query !== '') {
            const timerId = setTimeout(async () => {
                const results = await searchReviews(query) as unknown as Review[];
                setReviews(results);
            }, 900);

            return () => {
                clearTimeout(timerId);
            };
        } else setReviews([]);
    }, [query]);
    
    return (
        <View style={styles.container}>
            <ReviewSearch query={query} setQuery={setQuery} />
            <ReviewContent reviews={reviews?.length > 0 ? reviews : data} mutate={mutate} />
            <WriteReview />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})