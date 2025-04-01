import { Link, router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { styles } from './styles';

const LoginScreen = ({setActiveTab}:any) => {
 

  return (      
      <View style={styles.formContainer}>
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

        <TouchableOpacity style={styles.submitButton} onPress={() => router.navigate("/(drawer)/(tabs)/home")}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Link style={styles.forgotPassword} href={"/(auth)/forgot"}>Forgot Password</Link>
        </TouchableOpacity>
      </View>
  );
};


export default LoginScreen;
