import { Link, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from './styles';

// Define the form data structure
interface LoginForm {
  name: string;
  email: string;
  password: string;
}

// Validation Schema using Yup
const loginSchema = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  email: yup
    .string()
    .matches(
      /^(?:\d{10}|\S+@\S+\.\S+)$/,
      "Enter a valid Email or 10-digit Phone number"
    )
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

  // React Hook Form Setup
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const handleLogin = (data: LoginForm) => {
    console.log("Login Data:", data);

    // Navigate to Home screen with user's name
    router.replace({
      pathname: "/(drawer)/(tabs)/home",
      params: { name: data.name },
    });
  };

  return (
    <View style={styles.formContainer}>
      {/* Full Name Input */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
          </View>
        )}
      />

      {/* Email / Phone Number Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email / Phone no."
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
      />

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, !isValid && { backgroundColor: "#ccc" }]}
        onPress={handleSubmit(handleLogin)}
        disabled={!isValid}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Link style={styles.forgotPassword} href={"/(auth)/forgot"}>Forgot Password</Link>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
