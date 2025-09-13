import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#fcbd01" 
        barStyle="dark-content" 
      />
      <Image
        source={require('../images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcbd01', // Your specified color
  },
  logo: {
    width: 200,
    height: 200,
    // Adjust width and height according to your logo's aspect ratio
  },
});

export default LoadingScreen;