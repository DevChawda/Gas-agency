import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ViewTicketsScreen = () => {
  const tickets = [
    { id: '1', title: 'Delayed Order', status: 'Open' },
    { id: '2', title: 'Payment Issue', status: 'In Progress' },
    { id: '3', title: 'Incorrect Order', status: 'Closed' },
    { id: '4', title: 'Refund Request', status: 'Open' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Open':
        return styles.statusOpen;
      case 'In Progress':
        return styles.statusInProgress;
      case 'Closed':
        return styles.statusClosed;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Support Tickets</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketItem}>
            <Text style={styles.ticketTitle}>{item.title}</Text>
            <Text style={[styles.status, getStatusStyle(item.status)]}>
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  ticketItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statusOpen: {
    backgroundColor: '#ffcc00',
    color: '#000',
  },
  statusInProgress: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  statusClosed: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
});

export default ViewTicketsScreen;
