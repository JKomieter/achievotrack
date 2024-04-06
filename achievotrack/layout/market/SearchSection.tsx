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
        paddingLeft: 35,
        fontSize: 16,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontWeight: '300',
        color: '#000000',
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