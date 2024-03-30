import React, { useEffect, useState } from 'react';
import { View } from '../../components/Themed';
import { StyleSheet } from 'react-native';
import GetStarted from '../../layout/first_time/GetStarted';
import Sign from '../../layout/first_time/Sign';
import FillProfile from '../../layout/first_time/FillProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [stage, setStage] = useState(2);

  const stages = {
    1: <GetStarted setStage={setStage} />,
    2: <Sign setStage={setStage} />,
    3: <FillProfile />,
  } as Record<number, JSX.Element>;

  useEffect(() => {
    const isFirstTime = async () => {
      try {
        const firstTime = await AsyncStorage.getItem('firstTime');
        console.log('First time:', firstTime);
        if (firstTime) {
          setStage(2);
        } else {
          setStage(1);
        }
      } catch (error) {
        console.error('Error retrieving first-time data:', error);
      }
    };

    isFirstTime();
  }, []);

  return (
    <View style={styles.container}>
      {stages[stage]}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
  },
});