import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';

const ContactUsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/faq')}>
          <Text style={styles.tabText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => router.push('/feedback')}>
          <Text style={styles.tabText}>Feedback ▼</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>Choose a service you need help with</Text>
      
      {['Mahakal Gas Petrol Pumps', 'Mahakal Gas Gas', 'Mahakal Gas Lubes', 'KYC'].map((item, index) => (
        <TouchableOpacity key={index} style={styles.listItem} onPress={() => router.push('/help')}>
          <Text style={styles.listItemText}>{item}</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.leftButton]} onPress={() => router.push('/business-inquiry')}>
          <Text style={styles.buttonText}>Business Enquiry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rightButton]} onPress={() => router.push('/view-tickets')}>
          <Text style={styles.buttonText}>View Tickets</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('tel:1906')}>
          <Text style={styles.footerText}>LPG Emergency Helpline - 1906</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  listItemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  leftButton: {
    backgroundColor: '#E53935',
  },
  rightButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#e60000',
  },
});

export default ContactUsScreen;
