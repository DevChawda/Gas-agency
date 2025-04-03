import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const HelpScreen = () => {
  const handleContactSupport = () => {
    Linking.openURL('tel:+1234567890'); // Replace with your support number
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How Can We Help You?</Text>
      <Text style={styles.subtitle}>
        Browse the topics below or contact our support team.
      </Text>

      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Common Issues</Text>
        <Text style={styles.helpItem}>✔ How to place an order</Text>
        <Text style={styles.helpItem}>✔ Payment methods accepted</Text>
        <Text style={styles.helpItem}>✔ Tracking your delivery</Text>
        <Text style={styles.helpItem}>✔ Refund and cancellation policy</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Call Customer Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  helpSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  helpItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HelpScreen;
