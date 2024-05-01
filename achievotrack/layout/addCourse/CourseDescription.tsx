import { View, Text } from '../../components/Themed'
import React, { useCallback } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

export default function CourseDescription({
    syllabus,
    setSyllabus,
    course,
    setCourse
}: {
    syllabus: { name: string, base64String: string } | null,
    setSyllabus: React.Dispatch<React.SetStateAction<{ name: string, base64String: string } | null>>,
    course: { name: string, description: string, credit: string } | null,
    setCourse: React.Dispatch<React.SetStateAction<{ name: string, description: string, credit: string } | null>>
}) {

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            if (response.canceled) return;
            const fileUri = response.assets[0].uri;
            const base64String = await FileSystem.readAsStringAsync(fileUri, { encoding: 'base64' });
            setSyllabus({ name: response.assets[0].name as string, base64String });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Course Name"
                value={course?.name}
                onChangeText={(e) => setCourse({ ...course, name: e, description: course?.description || '', credit: course?.credit || '' })}
            />
            <TextInput
                style={{...styles.input, height: 100}}
                multiline
                placeholder="Course Description"
                value={course?.description}
                onChangeText={(e) => setCourse({ ...course, description: e, name: course?.name || '', credit: course?.credit || '' })}
            />
            <TextInput
                style={styles.input}
                placeholder="Course Credit"
                value={course?.credit}
                onChangeText={(e) => setCourse({ ...course, credit: e, name: course?.name || '', description: course?.description || '' })}
            />
            <TouchableOpacity
                style={styles.syllabus}
                onPress={handleDocumentSelection}
            >
                {
                    syllabus?.name ? <Text style={styles.fileName}>{syllabus.name}</Text> : (
                        <>
                            <AntDesign name="upload" size={24} color="black" />
                            <Text style={styles.add}>
                                Upload Syllabus
                            </Text>
                        </>
                    )
                }

            </TouchableOpacity>
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
        marginBottom: 15,
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
        overflow: 'hidden',
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