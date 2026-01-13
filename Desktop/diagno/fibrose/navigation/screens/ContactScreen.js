import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons'; // Importer Ionicons

export default ContactScreen = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async () => {
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await send(
        'service_0j42ayh',
        'template_q1fzrba',
        {
          name,
          email,
          message,
        },
        {
          publicKey: 'ScgoJN4XJTTJ3-YNm',
        },
      );

      console.log('SUCCESS!');
      setError('');
      setMessage('');
      setName('');
      setEmail('');
    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log('EmailJS Request Failed...', err);
        setError('Failed to send email. Please try again later.');
      } else {
        console.log('ERROR', err);
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.infoText, { color: isDarkMode ? 'white' : 'black' }]}>
          If you have any questions, our team is here to help you.
        </Text>
        <Text style={styles.errorText}>{error}</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { color: isDarkMode ? 'white' : 'black' }]}
            inputMode="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.required}>*</Text>
          <TextInput
            style={[styles.input, { color: isDarkMode ? 'white' : 'black' }]}
            inputMode="text"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.required}>*</Text>
          <TextInput
            style={[styles.input, styles.messageInput, { color: isDarkMode ? 'white' : 'black' }]}
            multiline
            numberOfLines={4}
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  messageInput: {
    height: 120,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row', // Ajouter flexDirection pour placer l'icône et le texte côte à côte
    alignItems: 'center', // Centrer l'icône et le texte verticalement
    justifyContent: 'center', // Centrer l'icône et le texte horizontalement
    backgroundColor: 'orange',
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10, // Ajouter un espace entre l'icône et le texte
  },
  icon: {
    marginRight: 5,
  },
  required: {
    color: 'red',
    fontSize: 18,
    marginRight: 5,
  },
});

