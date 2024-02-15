import React from 'react'
import { View, Text } from '@/components/Themed'
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Avatar } from 'react-native-paper';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { Majors, Minors, Year } from '@/constants/courses';


export default function ProfileInfo({
    setStage
}: {
    setStage: React.Dispatch<React.SetStateAction<number>>
}) {
    const [username, setUsername] = React.useState('');
    const [openMajor, setOpenMajor] = React.useState(false);
    const [openMinor, setOpenMinor] = React.useState(false);
    const [openYear, setOpenYear] = React.useState(false);
    const [majors, setMajors] = React.useState(Majors);
    const [minors, setMinors] = React.useState(Minors);
    const [years, setYears] = React.useState(Year);
    const [major, setMajor] = React.useState(null);
    const [minor, setMinor] = React.useState('');
    const [year, setYear] = React.useState('');

    React.useEffect(() => {
        const getUsername = async () => {
            const username = await AsyncStorage.getItem('username');
            if (username) setUsername(username);
        }
        getUsername();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fill out your profile</Text>
            <TouchableOpacity>
                <Avatar.Image size={90} source={require('@/assets/images/placeholder.jpg')} />
                <View style={styles.addIcon}>
                    <FontAwesome6 name="add" size={14} color="white" />
                </View>
            </TouchableOpacity>
            <View style={styles.choose}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.username}>Choose your major and minor</Text>
            </View>
            <View style={styles.form}>
                <DropDownPicker
                    open={openMajor}
                    value={major}
                    items={Majors}
                    setOpen={setOpenMajor}
                    setValue={setMajor}
                    setItems={setMajors}
                    style={styles.input}
                    placeholder="Select your Major"
                />
                <DropDownPicker
                    open={openMinor}
                    value={minor}
                    items={Minors}
                    setOpen={setOpenMinor}
                    setValue={setMinor}
                    setItems={setMajors}
                    style={styles.input}
                    placeholder="Select your Minor"
                />
                <DropDownPicker
                    open={openYear}
                    value={year}
                    items={Year}
                    setOpen={setOpenYear}
                    setValue={setYear}
                    setItems={setYears}
                    style={styles.input}
                    placeholder="Select your Year"
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'column',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    addIcon: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: '#d12323',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ translateY: -20 }, { translateX: 60 }]
    },
    choose: {
        marginTop: -10,
        textAlign: 'center',
    },
    username: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        gap: 15,
        flexDirection: 'column',
        marginTop: 30,
    },
    input: {
        width: '100%',
        padding: 10,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: 'white',
        fontSize: 16,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})