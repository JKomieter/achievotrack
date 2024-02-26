import React, { useState } from 'react'
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GetStarted from './GetStarted';
import Sign from './Sign';
import FillProfle from './FillProfle';


export default function FirstTime() {
  const [stage, setStage] = useState(1);

  const stages = {
    1: <GetStarted setStage={setStage} />,
    2: <Sign setStage={setStage} />,
    3: <FillProfle />,
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

