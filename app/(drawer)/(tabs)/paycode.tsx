import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Trash2 } from 'lucide-react-native';

interface PayCode {
  id: string;
  code: string;
  type: 'LPG' | 'Lubricant';
  amount: number;
  generatedDate: string;
}

const PayCodeScreen = () => {
  const [payCodeType, setPayCodeType] = useState<'LPG' | 'Lubricant'>('LPG');
  const [payCodeAmount, setPayCodeAmount] = useState<string>('');
  const [payCodes, setPayCodes] = useState<PayCode[]>([]);

  const generatePayCode = () => {
    if (!payCodeAmount) return;

    const newCode: PayCode = {
      id: String(Date.now()),
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
      type: payCodeType,
      amount: parseFloat(payCodeAmount),
      generatedDate: new Date().toLocaleDateString(),
    };

    setPayCodes(prev => [newCode, ...prev]);
    setPayCodeAmount('');
  };

  const deletePayCode = (id: string) => {
    setPayCodes(prev => prev.filter(code => code.id !== id));
  };

  const renderPayCodeItem = ({ item }: { item: PayCode }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardText}>🔑 Code: {item.code}</Text>
        <Text style={styles.cardText}>📦 Type: {item.type}</Text>
        <Text style={styles.cardText}>💰 Amount: ₹{item.amount.toFixed(2)}</Text>
        <Text style={styles.cardText}>📅 Date: {item.generatedDate}</Text>
      </View>
      <TouchableOpacity onPress={() => deletePayCode(item.id)}>
        <Trash2 size={22} color="#FF4D4D" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Generate Pay Code</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type:</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              payCodeType === 'LPG' && styles.activeTypeButton,
            ]}
            onPress={() => setPayCodeType('LPG')}
          >
            <Text style={styles.typeButtonText}>LPG</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              payCodeType === 'Lubricant' && styles.activeTypeButton,
            ]}
            onPress={() => setPayCodeType('Lubricant')}
          >
            <Text style={styles.typeButtonText}>Lubricant</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={payCodeAmount}
          onChangeText={setPayCodeAmount}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePayCode}>
        <Text style={styles.buttonText}>Generate Code</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Generated Codes</Text>

      <FlatList
        data={payCodes}
        keyExtractor={(item) => item.id}
        renderItem={renderPayCodeItem}
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
  typeContainer: {
    flexDirection: 'row',
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    backgroundColor: '#F4F4F4',
  },
  activeTypeButton: {
    backgroundColor: '#F2C9C9',
    borderColor: '#FFA500',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
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

export default PayCodeScreen;
