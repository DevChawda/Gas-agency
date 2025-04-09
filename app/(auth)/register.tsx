import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ✅ Validation Schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[A-Za-z ]+$/, "Only letters are allowed")
    .required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^\+\d{1,4}\d{10}$/, "Enter a valid mobile number with country code")
    .required("Mobile number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
  role: yup.string().oneOf(["admin", "user"], "Invalid role").required("Role is required"),
});

interface RegisterForm {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "user";
}

const RegisterScreen = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);

      // ✅ Use backend-expected keys: name, phone
      const payload = {
        name: data.fullName,
        email: data.email,
        phone: data.mobile,
        password: data.password,
        role: data.role,
      };

      const response = await axios.post("http://192.168.1.29:5000/api/users/register", payload);
      console.log("✅ Registration Success:", response.data);
      Alert.alert("Success", "Registration Successful!");
      router.replace("/(auth)");
    } catch (error: any) {
      console.error("❌ Registration Error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Registration failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      {/* Full Name */}
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

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Email"
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
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Mobile */}
      <Controller
        control={control}
        name="mobile"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Mobile No. (e.g., +919876543210)"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          </View>
        )}
      />
      {errors.mobile && <Text style={styles.errorText}>{errors.mobile.message}</Text>}

      {/* Password */}
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

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-check" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!isConfirmVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity onPress={() => setIsConfirmVisible(!isConfirmVisible)}>
              <MaterialCommunityIcons
                name={isConfirmVisible ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}

      {/* Role Selector */}
      <Controller
        control={control}
        name="role"
        render={({ field: { value, onChange } }) => (
          <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { marginRight: 10, backgroundColor: value === "user" ? "#0a84ff" : "#ccc" },
              ]}
              onPress={() => onChange("user")}
            >
              <Text style={styles.submitButtonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: value === "admin" ? "#0a84ff" : "#ccc" },
              ]}
              onPress={() => onChange("admin")}
            >
              <Text style={styles.submitButtonText}>Admin</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}

      {/* Submit */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
