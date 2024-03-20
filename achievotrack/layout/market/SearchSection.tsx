import { View } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { FontAwesome6, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SearchSection({
    query,
    setQuery
}: {
    query: string,
    setQuery: React.Dispatch<React.SetStateAction<string>>
}) {
    return (
        <View style={styles.container}>
            <View style={styles.searchIcon}>
                <AntDesign name="search1" size={20} color="#757575" />
            </View>
            <TextInput style={styles.input} value={query} onChangeText={setQuery} placeholder='Search resources...' />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    input: {
        padding: 13,
        paddingLeft: 35,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flex: 1,
        width: '100%'
    },
    searchIcon: {
        position: 'absolute',
        left: 30,
        backgroundColor: 'transparent',
        zIndex: 1
    }
})