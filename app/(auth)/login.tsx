import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ✅ Define the form structure
interface LoginForm {
  fullName: string;
  contact: string;
  password: string;
}

// ✅ Validation Schema using Yup
const loginSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Full Name must contain only letters")
    .required("Full Name is required"),
  contact: yup
    .string()
    .matches(/^(?:\d{10}|\S+@\S+\.\S+)$/, "Enter a valid Email or 10-digit Phone number")
    .required("Email or Phone number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

const LoginScreen = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Show loading state during API call

  // ✅ React Hook Form Setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  // ✅ On Form Submit (Login)
  const handleLogin = async (data: LoginForm) => {
    setLoading(true);

    try {
      const response = await axios.post("http://192.168.1.12:5000/api/users/login", data);

      if (response.status === 200) {
        const { token, user } = response.data;

        // ✅ Store token and user info in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        Alert.alert("Success", "Login Successful!");

        // ✅ Navigate to Home screen with user details
        router.replace({
          pathname: "/(drawer)/(tabs)/home",
          params: { name: user.fullName },
        });
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Login failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formContainer}>
      {/* Full Name Input */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

      {/* Contact (Email or Phone) Input */}
      <Controller
        control={control}
        name="contact"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}
      />
      {errors.contact && <Text style={styles.errorText}>{errors.contact.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!isPasswordVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && { backgroundColor: "#ccc" }]}
        onPress={handleSubmit(handleLogin)}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>{loading ? "Logging in..." : "Submit"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
