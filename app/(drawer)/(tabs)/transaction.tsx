import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { router, useNavigation } from 'expo-router';

// Define the type for a transaction
interface Transaction {
  id: string;
  date: string;
  amount: string;
  status: string;
}

const transactions: Transaction[] = [
  { id: '1', date: '2025-04-01', amount: '₹500', status: 'Completed' },
  { id: '2', date: '2025-03-30', amount: '₹350', status: 'Pending' },
  { id: '3', date: '2025-03-28', amount: '₹1000', status: 'Completed' },
  { id: '4', date: '2025-03-25', amount: '₹450', status: 'Failed' },
];

// Define type for the available screens in navigation
type RootStackParamList = {
  'transaction-create': undefined;  // Define available screens and params
  // Add other screen names here
};

const TransactionScreen = () => {
  const [transactionList, setTransactionList] = useState<Transaction[]>(transactions);
  const navigation = useNavigation<RootStackParamList>();

  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionCard}>
      <Text style={styles.transactionText}>Date: {item.date}</Text>
      <Text style={styles.transactionText}>Amount: {item.amount}</Text>
      <Text style={styles.transactionText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>

      {/* Transaction List */}
      <FlatList
        data={transactionList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* New Transaction Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/(drawer)/(tabs)/createTransactions')} // Correct type navigation
      >
        <Text style={styles.buttonText}>Create New Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 80, // To ensure the button is not hidden under the list
  },
  transactionCard: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;
