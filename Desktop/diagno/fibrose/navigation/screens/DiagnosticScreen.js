import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const DiagnosticScreen = () => {
  const { isDarkMode } = useTheme();

  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (imagePickerStatus.status !== 'granted') {
        alert('Permission to access media library is required!');
      }
    })();
  }, []);

  const openCamera = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.cancelled) {
      setImageUri(image.uri);
      setSelectedImage(image.uri);
      setResult(null);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setImageUri(result.uri);
      setResult(null);
    }
  };

  const sendImage = () => {
    console.log("Image envoyée :", imageUri);
    setResult("Résultat du diagnostic");
  };

  const clearImage = () => {
    setImageUri(null);
    setSelectedImage(null);
    setResult(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? '#007bff' : 'lightblue' }]} onPress={openCamera}>
          <Ionicons name="camera" size={30} color="black" />
          <Text style={[styles.buttonText, { color: 'black' }]}>Prendre une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, { backgroundColor: isDarkMode ? '#007bff' : 'lightblue' }]} onPress={pickImage}>
          <Ionicons name="image" size={30} color="black" />
          <Text style={[styles.buttonText, { color: 'black' }]}>Choisir une image</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <View style={styles.actionButtons}>
            <Button title="Get Results" onPress={sendImage} disabled={!imageUri} color="#FFA500" />
            <Button title="Effacer" onPress={clearImage} color="#FFA500" />
          </View>
        </View>
      )}
      {result && <View style={styles.resultContainer}><Text style={styles.resultText}>{result}</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DiagnosticScreen;
