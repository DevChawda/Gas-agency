import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/favicon.png')} 
          style={styles.icon} 
        />
        <Text style={styles.title}>Mahakaal Gas Agency</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.forgotPasswordTitle}>FORGOT PASSWORD</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Email / Phone no." 
          placeholderTextColor="#999" 
        />

        <TouchableOpacity style={styles.submitButton} onPress={() => router.navigate("/(auth)/otp")}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E8', // Light pink background
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 10,
    objectFit: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  forgotPasswordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EB4343', // Light red
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#EB4343',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;