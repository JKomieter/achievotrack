import React, { useEffect } from 'react'
import { StyleSheet, ScrollView,  } from 'react-native'
import ProfileHero from '../layout/profile/ProfileHero';
import ProfileProgress from '../layout/profile/ProfileProgress';
import ProfileStats from '../layout/profile/ProfileStats';
import { User } from '../libs/types';
import getUser from '../utils/getUser';
import { View } from '../components/Themed';

export default function Profile() {
    const { data } = getUser()
    const user = data as User;
    
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHero
                    profile_pic={user?.profile_pic}
                    username={user?.username}
                    email={user?.email}
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