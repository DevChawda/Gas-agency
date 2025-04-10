import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Trash2 } from 'lucide-react-native'; // Make sure you have lucide-react-native installed

interface Voucher {
  id: string;
  code: string;
  amount: number;
  date: string;
}

const InstaVouchersScreen = () => {
  const [amount, setAmount] = useState('');
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  const generateVoucher = () => {
    if (!amount) return;

    const newVoucher: Voucher = {
      id: Date.now().toString(),
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
      amount: parseFloat(amount),
      date: new Date().toLocaleDateString(),
    };

    setVouchers([newVoucher, ...vouchers]);
    setAmount('');
  };

  const deleteVoucher = (id: string) => {
    const filtered = vouchers.filter(v => v.id !== id);
    setVouchers(filtered);
  };

  const renderItem = ({ item }: { item: Voucher }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardText}>🎟 Code: {item.code}</Text>
        <Text style={styles.cardText}>💰 Amount: ₹{item.amount.toFixed(2)}</Text>
        <Text style={styles.cardText}>📅 Date: {item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteVoucher(item.id)}>
        <Trash2 size={22} color="#FF4D4D" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Generate Insta Voucher</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter voucher amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generateVoucher}>
        <Text style={styles.buttonText}>Generate Voucher</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Generated Vouchers</Text>

      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#444',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7E6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFD580',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#444',
  },
});

export default InstaVouchersScreen;
