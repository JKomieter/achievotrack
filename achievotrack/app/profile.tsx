import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView,  } from 'react-native'
import ProfileHero from '../layout/profile/ProfileHero';
import ProfileProgress from '../layout/profile/ProfileProgress';
import ProfileStats from '../layout/profile/ProfileStats';
import { User } from '../libs/types';
import getUser from '../utils/getUser';
import { View } from '../components/Themed';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function Profile() {
    const { data, mutate } = getUser()
    const user = data as User;

    const handleDocumentSelection = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
            if (response.canceled) return;
            const fileUri = response.assets[0].uri;
            const base64String = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
            const res = await axios.post(`${API_URL}/updateProfilePic`, {
                profile_pic: base64String, 
                userId
            })
            if (res.status === 200) mutate();
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHero
                    profile_pic={user?.profile_pic}
                    username={user?.username}
                    email={user?.email}
                    handleDocumentSelection={handleDocumentSelection}
                />
                <ProfileStats
                    classes={user?.classes}
                    tasks={user?.tasks}
                    grade={user?.grade}
                />
                <ProfileProgress completed_tasks={user?.completed_tasks} study_time={user?.study_time} achievements={user?.achievements} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})