import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, 
  Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// ✅ Define form structure
interface LoginForm {
  fullName: string;
  password: string;
}

// ✅ Validation Schema using Yup
const loginSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Full Name must contain only letters")
    .required("Full Name is required"),
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
  const [loading, setLoading] = useState(false);

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

        if (!user.email || !user.mobile) {
          Alert.alert("Error", "User data is incomplete.");
          return;
        }

        // ✅ Store token and user info in AsyncStorage
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
          })
        );

        Alert.alert("Success", "Login Successful!");

        // ✅ Navigate to Home screen
        router.replace("/(drawer)/(tabs)/home");
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
      
      <Text style={styles.title}>Login</Text>

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
              autoCapitalize="words"
            />
          </View>
        )}
      />
      {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

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
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/(auth)/forgot")}>
        <Text style={styles.registerText}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* Register Link */}
      <TouchableOpacity onPress={() => router.replace('/(auth)?tab=register')}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
