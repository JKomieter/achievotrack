import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Oops } from '@/assets/svgs';

import { Text, View } from '@/components/Themed';
import { SvgXml } from 'react-native-svg';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Coming soon!' }} />
      <View style={styles.container}>
        <SvgXml xml={Oops} width={400} height={400} />
        <Text style={styles.soon}>
          This feature is coming soon!
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  soon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
