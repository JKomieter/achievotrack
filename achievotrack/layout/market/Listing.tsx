import { View, Text } from '@/components/Themed'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons';
import categories from '@/constants/itemCategory';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'expo-image';
import PhoneInput from "react-native-phone-number-input";
import { ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getItems from '@/utils/getItems';


export default function Listing() {
    const [category, setCategory] = useState<{ label: string, value: string }>({ label: '', value: '' })
    const [files, setFiles] = useState<string[]>([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const [price, setPrice] = useState('')
    const [error, setError] = useState('');
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.DEV_BACKEND_URL;
    const [step, setStep] = useState(1);
    const { mutate } = getItems()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const img = result?.assets[0].uri
            setFiles((prev) => [...prev, img])
        }
    };


    const handleList = async () => {
        if (!category || !title || !desc || !files.length || !sellerName || !sellerEmail || !price) return setError('Fill in all fields');
        setIsLoading(true);
        const userId = await AsyncStorage.getItem('userId')
        const res = await axios.post(`${apiUrl}/addItem`, {
            sellerId: userId,
            category: category.value,
            title,
            description: desc,
            images: files,
            sellerName,
            sellerEmail,
            sellerPhone: formattedValue,
            price
        })
        console.log(res.data);
        if (res.status === 200) {}
        setStep(2)
        setIsLoading(false);
        mutate()
    }   

    useEffect(() => {
        if (error) setTimeout(() => setError(''), 3000);
    }, [error]);

    const Steps = {
        1: (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
                    <View style={styles.context}>
                        <Text style={styles.label}>
                            Photos
                        </Text>
                        <TouchableOpacity style={styles.photoEmpty} onPress={() => pickImage()}>
                            {
                                files.length > 0 ?
                                    <View style={styles.imgContainer}>
                                        {
                                            files.map((file, index) => (
                                                <View style={styles.img} key={index}>
                                                    <Image source={{ uri: file }} style={{ width: '100%', height: '100%', borderRadius: 25 }} />
                                                </View>
                                            ))
                                        }
                                    </View>
                                    : <View style={styles.addPhoto}>
                                        <FontAwesome6 name="add" size={25} color="#d12323" />
                                    </View>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={styles.context}>
                        <TextInput style={styles.input} placeholder='Title' value={title} onChangeText={setTitle} />
                        <TextInput style={{ ...styles.input, height: 100 }} multiline={true}
                            numberOfLines={4} placeholder='Description' value={desc} onChangeText={setDesc} />
                        <TextInput style={styles.input} placeholder='Price' value={price} onChangeText={setPrice} keyboardType="numeric" />
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="DM"
                            layout="first"
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            withDarkTheme
                            withShadow
                            autoFocus
                            containerStyle={{ ...styles.input, backgroundColor: '#f2f2f2'}}
                        />
                        <Dropdown
                            data={categories}
                            placeholder='Choose item category'
                            value={category}
                            style={{ ...styles.input, paddingVertical: 15 }}
                            onChange={(item) => setCategory({ label: item.label, value: item.value })}
                            labelField={'label'}
                            valueField={'label'}
                        />
                        <TextInput style={styles.input} placeholder='Seller Name' value={sellerName} onChangeText={setSellerName} />
                        <TextInput style={styles.input} placeholder='Seller Email' value={sellerEmail} onChangeText={setSellerEmail} />
                        {error && <Text style={{ color: '#d12323', fontSize: 14, textAlign: 'center' }}>{error}</Text>}
                        <View style={styles.actions}>
                            <TouchableOpacity style={{ ...styles.action, backgroundColor: '#d12323' }} onPress={() => handleList()}>
                                {
                                    isLoading ? <ActivityIndicator color='#fff' size={24} /> :
                                        <Text style={styles.actionTxt}>List your item</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        ),
        2: (
            <>
            </>
        )
    } as Record<number, React.JSX.Element>

    return Steps[step]
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
    },
    context: {
        width: '100%',
        marginTop: 20
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    },
    photoEmpty: {
        width: '100%',
        height: 200,
        borderStyle: 'dashed',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        overflow: 'hidden'
    },
    addPhoto: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#c3c3c3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: 60,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
        marginBottom: 15
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginTop: 15,
        marginBottom: 15
    },
    action: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#848383',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionTxt: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 17
    },
    imgContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        gap: 5,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    img: {
        width: 106,
        height: '50%',
        borderRadius: 25
    }
})