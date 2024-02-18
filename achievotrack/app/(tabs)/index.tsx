import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Courses from '@/layout/home/Courses';
import QuickActons from '@/layout/home/QuickActons';
import Schedule from '@/layout/home/Schedule';
import { ScrollView } from 'react-native';

export default function TabOneScreen() {

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
