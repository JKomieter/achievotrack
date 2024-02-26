import { View, Text } from '@/components/Themed'
import Listing from '@/layout/market/Listing'
import SellHero from '@/layout/sell/SellHero'
import SellRules from '@/layout/sell/SellRules'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'


export default function Sell() {
    const [ stage, setStage ] = useState(1)

    const stages = {
        1: (
            <View style={styles.container}>
                <SellHero />
                <SellRules />
                <View style={styles.sellBtnContainer}>
                    <TouchableOpacity style={styles.sellBtn} onPress={() => setStage(2)}>
                        <Text style={styles.sellBtnText}>List an item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ),
        2: <Listing />
    } as Record<number, React.JSX.Element>

    return stages[stage]
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sellBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10
    },
    sellBtn: {
        backgroundColor: '#d12323',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sellBtnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16
    }
})
