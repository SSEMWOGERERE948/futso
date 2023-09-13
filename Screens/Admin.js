import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Image, ImageBackground, Text, Dimensions } from 'react-native';
import Stadium from './Stadium';
import * as ImagePicker from 'expo-image-picker';
import { db } from './firebase'; // Import Firestore instance from your firebase.js file
import { collection, addDoc } from 'firebase/firestore';

const Admin = () => {
  const [Team, setName] = useState([]); // Set a default formation
  const [formation, setFormation] = useState('4-4-2'); // Set a default formation
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Store the selected players here
  const [playerName, setPlayerName] = useState(''); // Store the player's name here
  const [playerImageUri, setPlayerImageUri] = useState(null); // Store the URI of the player's image here
  const [league, setleague] = useState('');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [matchAdded, setMatchAdded] = useState(false); // Track if the match is successfully added

  const handleMatchSubmit = async () => {
    try {
      const matchData = {
        league,
        homeTeam,
        awayTeam,
        scheduledTime,
      };

      const docRef = await addDoc(collection(db, 'matches'), matchData);
      console.log('Match added with ID: ', docRef.id);
      setMatchAdded(true); // Set a flag to indicate success
      // Clear form fields
      setleague('');
      setHomeTeam('');
      setAwayTeam('');
      setScheduledTime('');
    } catch (error) {
      console.error('Error adding match:', error);
      // Handle error, e.g., show an error message to the admin
    }
  };

  // Function to handle adding a player to the lineup
  const handleAddPlayer = () => {
    if (playerName && playerImageUri) {
      const newPlayer = {
        id: selectedPlayers.length + 1, // Generate a  unique ID (You can use any method to ensure uniqueness)
        name: playerName,
        imageUri: playerImageUri, // Store the URI of the player's image in the 'imageUri' property
      };
      setSelectedPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayerName('');
      setPlayerImageUri(null);
    }
  };

  // Function to handle updating the formation
  const handleFormationChange = (text) => {
    setFormation(text);
  };

  // Function to open image picker
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setPlayerImageUri(result.uri);
    }
  };

  // Function to calculate the position of players based on the formation
  const getPlayerPosition = (playerIndex, formation) => {
    // Get the number of players in each row (excluding the goalkeeper)
    const playersPerRow = Math.floor((selectedPlayers.length - 1) / 2);

    // Calculate the row and column positions
    const row = Math.floor(playerIndex / playersPerRow);
    const col = playerIndex % playersPerRow;

    // Get the width and height of the player images
    const playerSize = 60;
    const playerWidth = playerSize + 10;
    const playerHeight = playerSize + 20;

    // Get the stadium dimensions
    const screenWidth = Dimensions.get('window').width;
    const stadiumAspectRatio = 2 / 3;
    const stadiumWidth = screenWidth;
    const stadiumHeight = screenWidth * stadiumAspectRatio;

    // Calculate the positions based on the formation
    const formationParts = formation.split('-');
    const numPlayersInFront = parseInt(formationParts[0]);
    const numPlayersInBack = parseInt(formationParts[2]);
    const numRows = 2;

    let top, left;
    if (playerIndex === 0) {
      // Goalkeeper
      top = (stadiumHeight - playerHeight) / 2;
      left = (stadiumWidth - playerWidth) / 2;
    } else if (playerIndex <= numPlayersInFront) {
      // Players in the front row
      top = (stadiumHeight - (numRows * playerHeight)) / 2;
      left = (stadiumWidth - (playersPerRow * playerWidth)) / 2 + col * playerWidth;
    } else {
      // Players in the back row
      top = (stadiumHeight - (numRows * playerHeight)) / 2 + playerHeight;
      left = (stadiumWidth - (playersPerRow * playerWidth)) / 2 + col * playerWidth;
    }

    return { top, left };
  };

  return (

    <ScrollView>
      <TextInput
      placeholder="League"
      value={league}
      onChangeText={setleague}
    />

    <TextInput
      placeholder="Home Team"
      value={homeTeam}
      onChangeText={setHomeTeam}
    />
    <TextInput
      placeholder="Away Team"
      value={awayTeam}
      onChangeText={setAwayTeam}
    />
    <TextInput
      placeholder="Scheduled Time"
      value={scheduledTime}
      onChangeText={setScheduledTime}
    />

    <Button title="Add Match" onPress={handleMatchSubmit} />
    {matchAdded && <Text style={styles.successMessage}>Match added successfully!</Text>}


    
    <ScrollView style={styles.container}>

<TextInput
        style={styles.input}
        placeholder="Team Name"
        value={Team}
        onChangeText={setName}
      />

      {/* Formation input */}

      <TextInput
        style={styles.input}
        placeholder="Formation (e.g., 4-4-2)"
        value={formation}
        onChangeText={handleFormationChange}
      />

      

      {/* Player input */}
      <TextInput
        style={styles.input}
        placeholder="Player Name"
        value={playerName}
        onChangeText={setPlayerName}
      />
      <Button title="Choose Image" onPress={handleImagePicker} />

      {playerImageUri && (
        <ImageBackground
          source={require('../assets/soccer-field.jpg')}
          style={styles.stadiumContainer}
          resizeMode="cover"
        >
          <Image source={{ uri: playerImageUri }} style={styles.playerImage} />
          <Text style={styles.playerName}>{playerName}</Text>
        </ImageBackground>
      )}

      <Button title="Add Player" onPress={handleAddPlayer} />

      {/* Stadium visualization */}
      <View style={styles.stadiumContainer}>
        <Stadium formation={formation} players={selectedPlayers} getPlayerPosition={getPlayerPosition} />
      </View>
    </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  stadiumContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  playerName: {
    marginTop: 2,
    fontSize: 8,
    textAlign: 'center',
  },

  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Admin;
