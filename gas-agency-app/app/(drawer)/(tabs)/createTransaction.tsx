// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import api from '@/utils/api';
// import { router } from 'expo-router';

// const CreateTransactionScreen = () => {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [status, setStatus] = useState('Completed');

//   const handleCreateTransaction = async () => {
//     try {
//       const formattedDate = date.replace(/\s*\/\s*/g, '-'); // e.g., 2000 / 03 / 02 -> 2000-03-02

//       await api.post('/transactions', {
//         amount: parseFloat(amount),
//         date: formattedDate,
//         status,
//       });

//       router.back();
//     } catch (error) {
//       console.error('Error creating transaction:', error);
//       Alert.alert('Error', 'Failed to create transaction.');
//     }
//   };

//   const handleDateChange = (text: string) => {
//     const cleaned = text.replace(/\D/g, ''); // Remove non-digits
//     let formatted = '';

//     if (cleaned.length <= 4) {
//       formatted = cleaned;
//     } else if (cleaned.length <= 6) {
//       formatted = `${cleaned.slice(0, 4)} / ${cleaned.slice(4)}`;
//     } else {
//       formatted = `${cleaned.slice(0, 4)} / ${cleaned.slice(4, 6)} / ${cleaned.slice(6, 8)}`;
//     }

//     setDate(formatted);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Transaction</Text>

//       {/* Amount Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Amount"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//       />

//       {/* Date Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD)"
//         value={date}
//         onChangeText={setDate}
//       />


//       {/* Status Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Status"
//         value={status}
//         onChangeText={setStatus}
//       />

//       {/* Save Button */}
//       <TouchableOpacity style={styles.button} onPress={handleCreateTransaction}>
//         <Text style={styles.buttonText}>Save Transaction</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CreateTransactionScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#E53935',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
// });
