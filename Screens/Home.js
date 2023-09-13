import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Matches"
        buttonStyle={styles.activeButton}
        onPress={() => navigation.navigate('match')}
      />
      <Button
        title="News"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('News')}
      />
      <Button
        title="Leagues"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Leagues')}
      />
      <Button
        title="More"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('More')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  activeButton: {
    backgroundColor: '#ADD8E6',
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'transparent',
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ADD8E6',
  },
});

export default Home;
