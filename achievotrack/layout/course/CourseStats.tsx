import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import { LineChart } from "react-native-chart-kit"
import { useRouter } from 'expo-router'
import useAddScoreStore from '@/store/useAddScore'

export default function CourseStats({
    scores,
    courseId 
}: {
    scores: number[],
    courseId: string | undefined
}) {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const labelList = scores?.length > 0 ? scores?.map((_, i) => `${i + 1}`) : ["Jan"]
    const dataList = scores?.length > 0 ? scores : [0]
    const router = useRouter()
    const { setCourseId } = useAddScoreStore()

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.title}>Stats Chart</Text>
                <TouchableOpacity style={styles.noChartBtn} onPress={() => {
                    setCourseId(courseId)
                    router.push('/addScore')
                }}>
                    <Text style={styles.topTxt}>Add score</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                {scores?.length > 0 ? <LineChart
                    data={{
                        labels: labelList,
                        datasets: [
                            {
                                data: dataList
                            }
                        ]
                    }}
                    width={screenWidth * 0.8}
                    height={230}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#d12323",
                        backgroundGradientFrom: "#d12323",
                        backgroundGradientTo: "#d12323",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "3",
                            strokeWidth: "2",
                            stroke: "#ffffff"
                        }
                    }}
                    bezier
                    style={{
                        borderRadius: 16
                    }}
                /> : <View style={styles.noChart}>
                    <Text style={styles.noChartTxt}>No Stats Available</Text>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    box: {
        height: 250,
        width: '100%',
        borderRadius: 25,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        paddingHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChart: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20
    },
    noChartTxt: {
        color: '#9c9c9c',
        fontSize: 20,
        fontWeight: '600'
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    noChartBtn: {
        backgroundColor: '#d12323',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30
    },
    topTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    }
})