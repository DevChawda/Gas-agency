import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const CreateTransactionScreen = () => {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handleTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    
    Alert.alert(
      'Transaction Successful',
      `₹${amount} added via ${paymentMethod}`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Money to Wallet</Text>

      <Text style={styles.label}>Enter Amount (₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Select Payment Method</Text>
      <View style={styles.paymentOptions}>
        {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.paymentOption, paymentMethod === method && styles.selectedOption]}
            onPress={() => setPaymentMethod(method)}
          >
            <Text style={styles.optionText}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleTransaction}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentOption: {
    width: '48%',
    paddingVertical: 12,
    backgroundColor: '#192f6a',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#EB4343',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#EB4343',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateTransactionScreen;
