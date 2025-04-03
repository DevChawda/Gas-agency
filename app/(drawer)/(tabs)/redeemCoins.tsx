import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const RedeemCoinsScreen = () => {
  const router = useRouter();
  const [coins, setCoins] = useState('');
  const userCoins = 500; // Example: User has 500 coins

  const handleRedeem = () => {
    const coinsToRedeem = parseInt(coins, 10);

    if (!coins || isNaN(coinsToRedeem) || coinsToRedeem <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of coins.');
      return;
    }

    if (coinsToRedeem > userCoins) {
      Alert.alert('Insufficient Coins', 'You do not have enough Happy Coins to redeem.');
      return;
    }

    Alert.alert(
      'Redemption Successful',
      `${coinsToRedeem} Happy Coins redeemed!`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redeem Happy Coins</Text>

      <Text style={styles.balance}>Your Balance: {userCoins} Coins</Text>

      <Text style={styles.label}>Enter Coins to Redeem</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter coins"
        keyboardType="numeric"
        value={coins}
        onChangeText={setCoins}
      />

      <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
        <Text style={styles.buttonText}>Redeem Now</Text>
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
  balance: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#192f6a',
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
  redeemButton: {
    backgroundColor: '#e60000',
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

export default RedeemCoinsScreen;
