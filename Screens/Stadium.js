import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, PanResponder, TouchableOpacity, Modal } from 'react-native';

const Stadium = ({ formation, players }) => {
  const screenWidth = Dimensions.get('window').width;
  const stadiumAspectRatio = 2 / 3; // Assuming the stadium image has an aspect ratio of 2:3

  const [playerPositions, setPlayerPositions] = useState({});
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(null);

  const getPlayerPosition = (playerIndex) => {
    if (playerPositions[playerIndex]) {
      return playerPositions[playerIndex];
    }

    const playersPerRow = 5;
    const row = Math.floor(playerIndex / playersPerRow);
    const col = playerIndex % playersPerRow;
    const playerSize = 80;
    const margin = 20;
    const top = row * (playerSize + margin);
    const left = col * (playerSize + margin);
    return { top, left };
  };

  const handlePlayerDrag = (index, dx, dy) => {
    const newPosition = {
      top: playerPositions[index].top + dy,
      left: playerPositions[index].left + dx,
    };
    setPlayerPositions((prevState) => ({ ...prevState, [index]: newPosition }));
  };

  const createPanResponder = (index) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;
        handlePlayerDrag(index, dx, dy);
      },
      onPanResponderRelease: () => {
        setSelectedPlayerIndex(index);
      },
    });
  };

  const closeProtrudingView = () => {
    setSelectedPlayerIndex(null);
  };

  return (
    <View style={[styles.stadium, { height: (screenWidth * stadiumAspectRatio) * 2 }]}>
      <Image source={require('../assets/soccer-field.jpg')} style={styles.fieldImage} resizeMode="contain" />

      {players.map((player, index) => {
        const position = getPlayerPosition(index);
        playerPositions[index] = position;
        const panResponder = createPanResponder(index);

        return (
          <View
            key={player.id}
            style={[styles.playerContainer, position]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity onPress={() => setSelectedPlayerIndex(index)}>
              <Image source={{ uri: player.imageUri }} style={styles.playerImage} resizeMode="cover" />
            </TouchableOpacity>
            <Text style={styles.playerName}>{player.name}</Text>
          </View>
        );
      })}

      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedPlayerIndex !== null}
      >
        <View style={styles.modalContainer}>
          {selectedPlayerIndex !== null && (
            <View style={styles.protrudingView}>
              <Image source={{ uri: players[selectedPlayerIndex].imageUri }} style={styles.protrudingImage} resizeMode="contain" />
              <Text style={styles.protrudingName}>{players[selectedPlayerIndex].name}</Text>
              <TouchableOpacity onPress={closeProtrudingView}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  stadium: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  fieldImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  playerContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  playerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  playerName: {
    marginTop: 1,
    fontSize: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  protrudingView: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  protrudingImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  protrudingName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Stadium;
