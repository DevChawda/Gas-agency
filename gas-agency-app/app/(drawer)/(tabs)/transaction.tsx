// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import { useFocusEffect } from '@react-navigation/native';
// import { router } from 'expo-router';
// import api from '@/utils/api';

// interface Transaction {
//   _id: string;
//   date: string;
//   amount: number;
//   status: string;
// }

// const TransactionScreen = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchTransactions = async () => {
//     try {
//       setRefreshing(true);
//       const res = await api.get('/transactions');
//       setTransactions(res.data);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//       Alert.alert('Error', 'Failed to fetch transactions. Please try again.');
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   const deleteTransaction = async (id: string) => {
//     try {
//       await api.delete(`/transactions/${id}`);
//       setTransactions((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       Alert.alert('Delete Failed', 'Could not delete transaction.');
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'success':
//         return 'green';
//       case 'pending':
//         return 'orange';
//       case 'failed':
//         return 'red';
//       default:
//         return 'black';
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchTransactions();
//     }, [])
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Transaction History</Text>

//       {transactions.length === 0 ? (
//         <Text style={styles.emptyText}>No transactions found.</Text>
//       ) : (
//         <SwipeListView
//           data={transactions}
//           keyExtractor={(item) => item._id}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={fetchTransactions} />
//           }
//           renderItem={({ item }) => (
//             <View style={styles.transactionCard}>
//               <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
//               <Text>Amount: ₹{item.amount}</Text>
//               <Text style={{ color: getStatusColor(item.status) }}>
//                 Status: {item.status}
//               </Text>
//             </View>
//           )}
//           renderHiddenItem={({ item }) => (
//             <View style={styles.rowBack}>
//               <TouchableOpacity
//                 onPress={() => deleteTransaction(item._id)}
//                 style={styles.deleteButton}
//               >
//                 <Text style={{ color: 'white' }}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//           rightOpenValue={-75}
//         />
//       )}

//       <TouchableOpacity
//         style={styles.createButton}
//         onPress={() => router.push('/(drawer)/(tabs)/createTransaction')}
//       >
//         <Text style={styles.buttonText}>➕ Create Transaction</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
//   transactionCard: {
//     backgroundColor: '#f1f1f1',
//     padding: 16,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   rowBack: {
//     alignItems: 'center',
//     backgroundColor: '#E53935',
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     paddingRight: 16,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   deleteButton: {
//     backgroundColor: '#E53935',
//     padding: 12,
//     borderRadius: 4,
//   },
//   createButton: {
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//     backgroundColor: '#E53935',
//     paddingHorizontal: 24,
//     paddingVertical: 14,
//     borderRadius: 30,
//     elevation: 3,
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 40,
//     fontSize: 16,
//     color: 'gray',
//   },
// });

// export default TransactionScreen;
