import { View, Text } from '@/components/Themed'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;

export default function addReview() {
  const arr = new Array(5).fill(0).map((_, i) => i + 1);
  const [stars, setStars] = useState(0);
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddReview = async () => {
    if (!courseName || !instructor || !review || !stars) {
      return setError('All fields are required');
    }
    try {
      setIsLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const data = {
        course: courseName,
        instructor,
        body: review,
        stars: stars,
        userId
      }
      await axios.post(`${API_URL}/addReview`, data);
      router.back();
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Course name" value={courseName} onChangeText={setCourseName} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Course instructor" value={instructor} onChangeText={setInstructor} />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>What's Your Rate?</Text>
        <View style={styles.stars}>
          {arr.map((i) => (
            <TouchableOpacity key={i} onPress={() => setStars(i)}>
              {
                i <= stars ? <AntDesign name="star" size={30} color="#FFD700" key={i} /> : <AntDesign name="staro" size={30} color="black" key={i} />
              }
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TextInput style={{ ...styles.input, height: 120 }} multiline placeholder="Write your review" value={review} onChangeText={setReview} />
      {error.length > 0 && <Text style={{ color: 'red' }}>{error}</Text>}
      <View style={styles.action}>
        <TouchableOpacity style={{ ...styles.submitBtn, backgroundColor: '#848383'}} onPress={() => router.back()}>
          <Text style={styles.submitBtnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={() => !isLoading && handleAddReview()}>
          {
            isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.submitBtnText}>Submit</Text>
          }

        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    paddingTop: 20
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#000000',
  },
  box: {
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
    height: 120,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    paddingVertical: 10
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  action: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  submitBtn: {
    backgroundColor: '#d12323',
    paddingVertical: 15,
    minWidth: 120,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  }
})