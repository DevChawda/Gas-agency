import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Linking,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as MailComposer from 'expo-mail-composer';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('token');
          router.replace('/(auth)');
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* ACCOUNT SECTION */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity
          style={styles.accountItem}
          onPress={() => router.push('/(drawer)/edit-profile')}
        >
          <Image
            source={
              user?.profileImage
                ? { uri: user.profileImage }
                : require('../../assets/images/User.jpg')
            }
            style={styles.profileImage}
          />
          <View style={styles.accountText}>
            <Text style={styles.accountName}>{user?.fullName || 'Your Name'}</Text>
            <Text style={styles.accountEmail}>{user?.email || 'youremail@mail.com'}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PREFERENCES</Text>
        <TouchableOpacity style={styles.listItem} onPress={() => setLanguageModalVisible(true)}>
          <Text style={styles.listItemText}>Language</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.listItemValue}>{selectedLanguage}</Text>
            <Ionicons name="chevron-forward" size={16} color="gray" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Location', 'Location settings coming soon.')}> 
          <Text style={styles.listItemText}>Location</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.listItemValue}>Los Angeles, CA</Text>
            <Ionicons name="chevron-forward" size={16} color="gray" />
          </View>
        </TouchableOpacity>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Email Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={emailNotifications ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setEmailNotifications(!emailNotifications)}
            value={emailNotifications}
          />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Push Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={pushNotifications ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setPushNotifications(!pushNotifications)}
            value={pushNotifications}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESOURCES</Text>
        <TouchableOpacity style={styles.listItem} onPress={() => MailComposer.composeAsync({ recipients: ['support@gasagency.com'], subject: 'Support Request' })}>
          <Text style={styles.listItemText}>Contact Us</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => MailComposer.composeAsync({ recipients: ['bugs@gasagency.com'], subject: 'Bug Report' })}>
          <Text style={styles.listItemText}>Report Bug</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.yourapp')}>
          <Text style={styles.listItemText}>Rate in App Store</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => Linking.openURL('https://yourapp.com/terms')}>
          <Text style={styles.listItemText}>Terms and Privacy</Text>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal visible={languageModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16 }}>Select Language</Text>
            {['English', 'Hindi', 'Tamil'].map((lang) => (
              <Pressable
                key={lang}
                onPress={() => {
                  setSelectedLanguage(lang);
                  setLanguageModalVisible(false);
                }}
                style={{ paddingVertical: 10 }}
              >
                <Text style={{ fontSize: 16 }}>{lang}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setLanguageModalVisible(false)} style={{ marginTop: 16 }}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  accountText: {
    flex: 1,
  },
  accountName: {
    fontSize: 18,
    fontWeight: '600',
  },
  accountEmail: {
    fontSize: 14,
    color: 'gray',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemValue: {
    fontSize: 16,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 24,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
