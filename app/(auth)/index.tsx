import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginScreen from './login'
import { useRouter } from 'expo-router';
import { styles } from './styles';
import RegisterScreen from './register';


const index = () => {
  const [activeTab, setActiveTab] = useState('login'); //register
  const router = useRouter();
  
  useEffect(() => {

  }, [activeTab])

  return (<>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/favicon.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>Mahakaal Gas Agency</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'login' ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => setActiveTab('login')}
        >
          <Text style={activeTab === 'login' ? styles.activeText : styles.inactiveText}>
            LOGIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            activeTab === 'register' ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={activeTab === 'register' ? styles.activeText : styles.inactiveText}>
            REGISTER
          </Text>
        </TouchableOpacity>
      </View>
      { activeTab === 'register' ? <RegisterScreen  setActiveTab={setActiveTab} /> : <LoginScreen  setActiveTab={setActiveTab} /> }
    </View>
  </>)
}


export default index