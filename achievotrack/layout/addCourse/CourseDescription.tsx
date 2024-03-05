import { View, Text } from '@/components/Themed'
import React, { useCallback, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import DocumentPicker, { types, DocumentPickerResponse } from 'react-native-document-picker';

export default function CourseDescription() {
    const [fileResponse, setFileResponse] = useState < DocumentPickerResponse | undefined>();

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [types.pdf, types.docx]
            });
            setFileResponse(response[0]);
        } catch (err) {
            // console.warn(err);
        }
    }, []);

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Course Name"
        />
        <TextInput
            style={styles.input}
            placeholder="Course Description"
        />
        <TextInput
            style={styles.input}
            placeholder="Course Credit"
        />
        {
            fileResponse ? (
                <Text style={styles.fileName}>
                    {fileResponse.name}
                </Text> 
            ) : (
                <TouchableOpacity
                    style={styles.syllabus}
                    onPress={handleDocumentSelection}
                >
                    <AntDesign name="upload" size={24} color="black" />
                    <Text style={styles.add}>
                        Upload Syllabus
                    </Text>
                </TouchableOpacity>
            )
        }
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
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
    syllabus: {
        width: '100%',
        height: 100,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    add: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
    },
    fileName: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
    }
})