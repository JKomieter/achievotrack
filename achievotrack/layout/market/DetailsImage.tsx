import { View } from '@/components/Themed';
import React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'; // Changed import statement
import { AntDesign } from '@expo/vector-icons';

export default function DetailsImage({
  images
}: {
  images: string[]
}) {
  if (!images || images.length === 0) {
    console.error("Images array is empty or undefined");
    return null;
  }
  const scrollViewRef = React.useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <View style={styles.imgContainer}>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollTo({ x: -screenWidth, animated: true })} style={styles.left}>
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>
      <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} style={{ width: '100%', height: '100%' }}>
        {images?.map((image) => (
          <Image key={image} source={{ uri: `data:image/png;base64,${image}` }} style={{ width: screenWidth, height: '100%' }} resizeMode='cover' /> 
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => scrollViewRef.current?.scrollTo({ x: screenWidth, animated: true })} style={styles.right}>
        <AntDesign name="right" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    height: 300,
    overflow: 'hidden',
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  left: {
    position: 'absolute',
    top: '50%',
    left: 5,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  right: {
    position: 'absolute',
    top: '50%',
    right: 5,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 50,
  }
});
