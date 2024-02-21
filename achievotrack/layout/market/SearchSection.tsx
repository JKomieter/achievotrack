import { View } from '@/components/Themed'
import React from 'react'
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { FontAwesome6, AntDesign } from '@expo/vector-icons';

export default function SearchSection() {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
              <FontAwesome6 name="filter" size={24} color="#494949" />
        </TouchableOpacity>
        <View style={styles.searchIcon}>
            <AntDesign name="search1" size={20} color="#494949" />
        </View>
        <TextInput style={styles.input} placeholder='Search resources...' />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        width: '90%',
        marginTop: 20,
    },
    input: {
        padding: 13,
        paddingLeft: 30,
        borderRadius: 20,
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        flex: 1
    },
    searchIcon: {
        position: 'absolute',
        left: 40,
        backgroundColor: 'transparent',
        zIndex: 1
    }
})