import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
    const { isDarkMode } = useTheme();
    const navigation = useNavigation();

    const instructions = [
        "If you don't know how to use our application, follow these instructions and press Next.",
        "Take a photo or upload images.",
        "View results for image processing and diagnosis."
    ];

    const stepImages = [
        require('../../assets/step1.png'),
        require('../../assets/step2.png'),
        require('../../assets/step3.png'),
    ];

    const [showInstructions, setShowInstructions] = useState(false);
    const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

    const handleStartDiagnostic = () => {
        setShowInstructions(true);
        setCurrentInstructionIndex(0);
    };

    const handleNextInstruction = () => {
        if (currentInstructionIndex < instructions.length - 1) {
            setCurrentInstructionIndex(currentInstructionIndex + 1);
        } else {
            setShowInstructions(false);
            setCurrentInstructionIndex(0);
            navigation.navigate('DiagnosticScreen');
        }
    };

    const handlePreviousInstruction = () => {
        if (currentInstructionIndex > 0) {
            setCurrentInstructionIndex(currentInstructionIndex - 1);
        }
    };

    const handleCloseInstructions = () => {
        setShowInstructions(false);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? 'black' : 'white' }]}>
            <Image source={require('../../assets/icone.png')} style={styles.icon} />

            <Text style={[styles.welcomeText, { color: isDarkMode ? 'white' : 'black' }]}>Welcome to Our Application</Text>
            <Text style={[styles.subtitleText, { color: isDarkMode ? 'gray' : 'black' }]}>Click on the start button and follow the steps</Text>

            <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#1E90FF' : '#ADD8E6' }]} onPress={handleStartDiagnostic}>
                <Text style={styles.buttonText}>Start Diagnostic</Text>
            </TouchableOpacity>

            <Modal
                visible={showInstructions}
                animationType="slide"
                onRequestClose={handleCloseInstructions}
            >
                <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? '#333' : '#eee' }]}>
                    <TouchableOpacity onPress={handleCloseInstructions} style={styles.closeButton}>
                        <Ionicons name="close-circle" size={24} color="red" style={styles.closeIcon} />
                    </TouchableOpacity>
                    <View style={styles.modalContent}>
                        <Image source={stepImages[currentInstructionIndex]} style={styles.stepImage} />
                        <Text style={[styles.modalInstruction, { color: isDarkMode ? 'white' : 'black' }]}>
                            {instructions[currentInstructionIndex]}
                        </Text>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={handlePreviousInstruction} style={[styles.modalButton, { borderColor: '#FFA500', borderWidth: 1 }]}>
                            <Text style={[styles.modalButtonText, { color: '#FFA500' }]}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextInstruction} style={[styles.modalButton, { borderColor: '#007AFF', borderWidth: 1 }]}>
                            <Text style={[styles.modalButtonText, { color: '#007AFF' }]}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF4500',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 18,
        color: '#FF6347',
        marginBottom: 20,
        textAlign: 'center',
    },
    icon: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        elevation: 5, // Ajoute une ombre sous le bouton
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 19,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    closeIcon: {
        marginTop: 0,
    },
    modalContent: {
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
    },
    stepImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
        borderRadius: 10,
    },
    modalInstruction: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FF4500',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    modalButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    modalButtonText: {
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default HomeScreen;