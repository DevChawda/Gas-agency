import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);

      // 👇 Detect which API to call based on email
      const isAdmin = email.includes("admin"); // or use a separate switch
      const loginUrl = isAdmin
        ? "http://192.168.1.29:5000/api/admin/login"
        : "http://192.168.1.29:5000/api/users/login";

      console.log("➡️ Logging in to:", loginUrl); // Log the API URL

      const response = await axios.post(loginUrl, {
        email,
        password,
      });

      console.log("✅ Login Response:", response.data); // Log the entire response data

      const { token, user } = response.data;
      console.log("✅ Logged in user:", user);

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      if (user?.role === "admin") { // Added optional chaining for safety
        const adminPanelURL = "http://192.168.1.29:3000";
        console.log("🌐 Opening Admin Panel URL:", adminPanelURL);
        Linking.openURL(adminPanelURL);
      } else {
        console.log("📱 Navigating to user drawer.");
        router.replace("/(drawer)");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* Email */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email" size={20} color="#666" style={styles.icons} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.icons} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!isPasswordVisible}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;