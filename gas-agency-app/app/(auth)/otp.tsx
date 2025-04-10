import { router } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const OTPVerificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.icon} 
        />
        <Text style={styles.agencyName}>Mahakaal Gas Agency</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.otpTitle}>OTP VERIFICATION</Text>
        <View style={styles.otpInputs}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={() => router.navigate("/(auth)/reset")}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9C9', // Light pink background
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 10,
    objectFit: 'contain',
  },
  agencyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%', // Adjust width as needed
    alignItems: 'center',
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpInputs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  verifyButton: {
    backgroundColor: '#E53935', // Red button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;