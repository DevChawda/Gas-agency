import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Linking, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";

const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About Mahakal Gas Agency</Text>

      {/* Agency Overview */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Our Mission</Text>
        <Text style={styles.description}>
          Mahakal Gas Agency strives to provide reliable, efficient, and safe LPG gas delivery services to homes and businesses across the region. Our mission is to ensure that every customer receives top-quality service with safety as our utmost priority.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Our Vision</Text>
        <Text style={styles.description}>
          To be the leading gas agency providing unmatched customer service, safety, and sustainability, contributing to a cleaner, greener, and more energy-efficient world.
        </Text>
      </View>

      {/* Contact Info */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Contact Us</Text>
        <Text style={styles.description}>📍 Address: 123 Mahakal Road, City, State</Text>
        <Text style={styles.description}>📞 Phone: +123 456 7890</Text>
        <Text style={styles.description}>✉️ Email: support@mahakalgas.com</Text>
      </View>

      {/* Social Media Links */}
      <View style={styles.section}>
        <Text style={styles.subHeader}>Follow Us</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com/mahakalgas")}>
          <Text style={styles.link}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/mahakalgas")}>
          <Text style={styles.link}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com/mahakalgas")}>
          <Text style={styles.link}>Instagram</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    color: "#007bff",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
});

export default AboutScreen;
