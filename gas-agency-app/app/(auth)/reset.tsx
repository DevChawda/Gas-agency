import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { router } from 'expo-router';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpToken, setOtpToken] = useState<string | null>(null);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);  // Visibility for new password
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);  // Visibility for confirm password

  const navigation = useNavigation();  // Initialize navigation

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("otpToken");
      setOtpToken(token);
    };
    fetchToken();
  }, []);

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please enter both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!otpToken) {
      Alert.alert("Error", "No token found. Please complete OTP verification again.");
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.115:5000/api/users/reset-password',
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${otpToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Password reset successfully.");
        await AsyncStorage.multiRemove(["otpToken", "resetEmail"]);

        // Redirect to login screen
        router.replace("/(auth)"); // Navigate to the login screen
      }
    } catch (error: any) {
      console.error("Reset password error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
        <Text style={styles.title}>Reset Password</Text>
      </View>

      <View style={styles.formContainer}>
        {/* New Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            style={styles.input}
            secureTextEntry={!isNewPasswordVisible} // Toggle visibility for new password
            onChangeText={setNewPassword}
            value={newPassword}
          />
          <TouchableOpacity 
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)} 
            style={styles.eyeToggle}
          >
            <Icon name={isNewPasswordVisible ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={!isConfirmPasswordVisible} // Toggle visibility for confirm password
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <TouchableOpacity 
            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} 
            style={styles.eyeToggle}
          >
            <Icon name={isConfirmPasswordVisible ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  inputContainer: {
    position: 'relative', // To position the eye icon correctly
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    color: '#333',
  },
  eyeToggle: {
    position: 'absolute',
    right: 10,
    top: 12, // Align the eye icon vertically with the input field
  },
  button: {
    backgroundColor: '#EB4343',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
