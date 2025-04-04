import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import api from '@/utils/api';

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  status: string;
}

const TransactionScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      Alert.alert('Delete Failed', 'Could not delete transaction.');
    }
  };

  // ✅ Fetch again every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>

      <SwipeListView
        data={transactions}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text>Date: {item.date}</Text>
            <Text>Amount: ₹{item.amount}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity onPress={() => deleteTransaction(item._id)} style={styles.deleteButton}>
              <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
      />

      {/* ✅ Create Transaction Button at Bottom */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/(drawer)/(tabs)/createTransaction')}
      >
        <Text style={styles.buttonText}>➕ Create Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  transactionCard: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#E53935',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#E53935',
    padding: 12,
    borderRadius: 4,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#E53935',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default TransactionScreen;
