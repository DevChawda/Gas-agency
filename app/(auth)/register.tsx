import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { styles } from './styles';

const RegisterScreen = ({setActiveTab}:any) => { // Renamed to RegisterScreen


  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email / Phone no."
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        secureTextEntry
      />
      <TouchableOpacity style={styles.submitButton} onPress={() => setActiveTab("login")}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );


}

export default RegisterScreen; 