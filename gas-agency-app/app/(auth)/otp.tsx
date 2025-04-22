import axios from 'axios';
import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeSyntheticEvent} from 'react-native';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // Define the refs with nullable TextInput types
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleVerify = async () => {
    const fullOtp = otp.join("");

    try {
      const email = await AsyncStorage.getItem("resetEmail");
      console.log("Stored email from AsyncStorage:", email);

      if (!email) {
        Alert.alert("Error", "Email not found. Please restart the reset process.");
        return;
      }

      const response = await axios.post("http://192.168.1.115:5000/api/users/verify-otp", {
        email,
        otp: fullOtp,
      });

      if (response.status === 200) {
        console.log("OTP verification successful. Token received:", response.data.token);
        await AsyncStorage.setItem("otpToken", response.data.token);
        router.push("/(auth)/reset");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert("Error", error.response?.data?.message || "Invalid OTP.");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  // Explicitly define parameter types for handleInputChange
  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Focus on the next input if the current one is filled
    if (value !== "" && index < otp.length - 1) {
      setOtp(newOtp);
      setTimeout(() => {
        const nextInput = index + 1;
        if (nextInput <= otp.length - 1) {
          inputRefs.current[nextInput]?.focus(); // Access focus on the next input
        }
      }, 50);
    } else {
      setOtp(newOtp);
    }
  };

  // Explicitly define parameter types for handleKeyPress
  const handleKeyPress = (e: NativeSyntheticEvent<any>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === "") {
      const prevInput = index - 1;
      if (prevInput >= 0) {
        inputRefs.current[prevInput]?.focus(); // Focus the previous input
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
        <Text style={styles.agencyName}>Mahakaal Gas Agency</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.otpTitle}>OTP VERIFICATION</Text>
        <View style={styles.otpInputs}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)} // Assign refs dynamically
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(value) => handleInputChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otp[index]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2C9C9',
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
    width: '90%',
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
    backgroundColor: '#E53935',
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
