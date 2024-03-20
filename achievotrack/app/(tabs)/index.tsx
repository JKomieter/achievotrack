import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import Courses from '@/layout/home/Courses';
import QuickActons from '@/layout/home/QuickActons';
import Schedule from '@/layout/schedule/Schedule';
import { ScrollView } from 'react-native';

export default function TabOneScreen() {
  return (
    <ScrollView style={{flex: 1, height: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Courses />
        <QuickActons />
        <Schedule />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "100%"
  }
});
