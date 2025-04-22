import axios, { AxiosError } from 'axios';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type ErrorResponse = {
  message?: string;
};

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // API call to send OTP
  const sendOtp = async (email: string) => {
    try {
      // Ensure backend endpoint matches what your backend expects
      const response = await axios.post('http://192.168.1.115:5000/api/users/send-otp', { email });
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const message =
        axiosError.response?.data?.message || axiosError.message || 'Something went wrong';
      throw new Error(message);
    }
  };

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your registered email address.');
      return;
    }

    try {
      setLoading(true);

      // Store email in AsyncStorage for later use (OTP verification)
      await AsyncStorage.setItem('resetEmail', email);
      console.log("Email stored in AsyncStorage:", await AsyncStorage.getItem("resetEmail"));

      const response = await sendOtp(email);

      if (response.status === 200) {
        // Redirect to OTP screen on successful OTP generation
        Alert.alert('Success', 'OTP sent successfully.');
        router.push({
          pathname: '/(auth)/otp',
          params: { email }, // Pass email to OTP screen
        });
      }
    } catch (error) {
      // Handle errors from the backend
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
        <Text style={styles.title}>Mahakaal Gas Agency</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.forgotPasswordTitle}>FORGOT PASSWORD</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your registered email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={[styles.submitButton, loading && { backgroundColor: '#ccc' }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Send OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
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
    color: '#EB4343',
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
