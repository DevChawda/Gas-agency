// app/(drawer)/faq.tsx
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const FAQScreen = () => {
  const faqs = [
    { question: 'How can I place an order?', answer: 'To place an order, go to the home screen and select the product you want.' },
    { question: 'What payment methods are accepted?', answer: 'We accept credit/debit cards, mobile payments, and cash on delivery.' },
    { question: 'How do I track my order?', answer: 'You can track your order from the "Transaction" tab in the app.' },
    { question: 'How do I contact customer support?', answer: 'You can contact support via the "Contact" tab or call our hotline.' },
    { question: 'What is the delivery time?', answer: 'Our delivery time typically ranges from 1 to 3 hours depending on location.' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  faqItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  answer: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
});

export default FAQScreen;
