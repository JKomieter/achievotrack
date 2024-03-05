import { Text, View } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import SellHero from './SellHero'

export default function SellRules({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {
    const rules = [
        {
            num: 1,
            title: 'List your item',
            desc: 'Please describe the condition of your item accurately, including any flaws or damage.'
        },
        {
            num: 2,
            title: 'Set a price',
            desc: 'Please set a fair price for your item based on its condition, market value, and other relevant factors.'
        },
    ]


    return (
        <View style={styles.container}>
            <ScrollView>
            <SellHero />
            {
                rules.map((rule) => (
                    <View style={styles.rule} key={rule.num}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{rule.title}</Text>
                            <Text style={styles.desc}>{rule.desc}</Text>
                        </View>
                    </View>
                ))
            }
            <View style={styles.sellBtnContainer}>
                <TouchableOpacity style={styles.sellBtn} onPress={() => setStage(2)}>
                    <Text style={styles.sellBtnText}>List an item</Text>
                </TouchableOpacity>
        </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rule: {
        display: 'flex',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    numCircle: {
        backgroundColor: '#848383',
        borderRadius: 50,
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0
    },
    num: {
        color: '#d12323',
        fontSize: 20,
        fontWeight: '700'
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10
    },
    desc: {
        fontSize: 16,
        color: '#848383',
        marginTop: -5,
        fontWeight: '300'
    },
    sellBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        paddingHorizontal: 10,
        // position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
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