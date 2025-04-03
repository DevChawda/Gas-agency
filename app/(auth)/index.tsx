import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './login';
import RegisterScreen from './register';
import { styles } from './styles';

const IndexScreen = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/favicon.png')} style={styles.icon} />
        <Text style={styles.title}>Mahakaal Gas Agency</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, activeTab === 'login' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setActiveTab('login')}
        >
          <Text style={activeTab === 'login' ? styles.activeText : styles.inactiveText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, activeTab === 'register' ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={activeTab === 'register' ? styles.activeText : styles.inactiveText}>REGISTER</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        {activeTab === 'register' ? <RegisterScreen /> : <LoginScreen />}
      </View>
    </View>
    </ScrollView>
  );
};

export default IndexScreen;
