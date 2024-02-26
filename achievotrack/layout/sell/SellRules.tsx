import { Text, View } from '@/components/Themed'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

export default function SellRules() {
    const rules = [
        {
            num: 1,
            title: 'List your item',
            desc: 'Please describe the condition of your item accurately, including any flaws or damage.'
        },
        {
            num: 2,
            title: 'Set a price',
            desc: 'Please describe the condition of your item accurately, including any flaws or damage.'
        },
    ]


    return (
        <View style={styles.container}>
            {/* <FlatList
                data={rules}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.rule}>
                            <View style={styles.numCircle}>
                                <Text style={styles.num}>{item.num}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.desc}>{item.desc}</Text>
                            </View>
                        </View>
                    )
                }}
                keyExtractor={item => item.num.toString()}
            /> */}

            {
                rules.map((rule) => (
                        <View style={styles.rule} key={rule.num}>
                            <View style={styles.numCircle}>
                                <Text style={styles.num}>{rule.num}</Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.title}>{rule.title}</Text>
                                <Text style={styles.desc}>{rule.desc}</Text>
                            </View>
                        </View>
                    ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    rule: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        marginBottom: 15
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
        marginTop: -5
    }

})