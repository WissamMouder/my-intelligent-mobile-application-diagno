import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  const backgroundImage = require('../../assets/images/background.jpg');

  return (
    <View style={styles.container}>
      {/* Diagonale en-dessus de la page */}
      <View style={styles.diagonal}></View>
      {/* Contenu de la page */}
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.title}>About Us</Text>
          <Text style={styles.description}>
            Welcome to our modern and stylish application that aids in the diagnosis of pulmonary fibrosis.
          </Text>
          {/* Texte proposé */}
          <Text style={styles.text}>
            Our application uses advanced algorithms to analyze radiographic images and provide accurate diagnosis
            of pulmonary fibrosis, helping medical professionals and patients to detect and manage the condition effectively.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  diagonal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 0, // Hauteur de la diagonale
    backgroundColor: '#007AFF', // Couleur de la diagonale
    zIndex: 1,
    transform: [{ rotate: '-4deg' }], // Rotation de la diagonale
  },
  backgroundImage: {
    flex: 1,
    width: '100%', // Définir la largeur à 100%
    height: '100%', // Définir la hauteur à 100%
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    lineHeight: 24,
  },
});

export default AboutUsScreen;
