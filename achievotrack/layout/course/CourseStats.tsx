import { View, Text } from '@/components/Themed'
import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { LineChart } from "react-native-chart-kit"

export default function CourseStats() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stats Chart</Text>
            <View style={styles.box}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April",],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 1,
                                    Math.random() * 1,
                                    Math.random() * 1,
                                    Math.random() * 1,
                                ]
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
                />
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

})