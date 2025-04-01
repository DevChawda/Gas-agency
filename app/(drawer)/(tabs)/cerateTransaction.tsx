import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';

const CreateTransactionScreen = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [status] = useState('Completed'); // Hardcoded status for simplicity
  const navigation = useNavigation();

  const handleCreateTransaction = () => {
    // In a real app, you would save this transaction to a database or state
    const newTransaction = { amount, date, status };

    // Navigate back to Transaction screen
    navigation.goBack();

    // Optionally, you could add the new transaction to a list or call an API to save the data.
    console.log('New Transaction:', newTransaction);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Transaction</Text>

      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      {/* Date Input (You can implement a date picker later if needed) */}
      <TextInput
        style={styles.input}
        placeholder="Enter Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      {/* Hardcoded Status */}
      <Text style={styles.statusText}>Status: {status}</Text>

      {/* Create Button */}
      <TouchableOpacity onPress={handleCreateTransaction} style={styles.button}>
        <Text style={styles.buttonText}>Create Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
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
