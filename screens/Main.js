import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Main = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Main;