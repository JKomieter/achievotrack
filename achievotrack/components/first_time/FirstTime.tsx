import React, { useState } from 'react'
import { Text, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GetStarted from './GetStarted';
import Sign from './Sign';


export default function FirstTime() {
  const [stage, setStage] = useState(1);

  const stages = {
    1: <GetStarted setStage={setStage} />,
    2: <Sign />,
  } as Record<number, JSX.Element>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {stages[stage]}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 30,
  },
})

