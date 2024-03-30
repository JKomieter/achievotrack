import { View } from '@/components/Themed'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function ReviewStars({ stars }: { stars: number }) {
    const filledStars = Math.round(stars);

    const renderStars = () => {
        const starComponents = [];
        for (let i = 0; i < 5; i++) {
            if (i < filledStars) {
                starComponents.push(
                    <AntDesign name="star" size={24} color="#FFD700" key={i} />
                );
            } else {
                starComponents.push(
                    <AntDesign name="staro" size={24} color="black" key={i} />
                );
            }
        }
        return starComponents;
    };

    return (
        <View style={styles.container}>
            {renderStars()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        gap: 10,
        flexDirection: "row"
    }
})