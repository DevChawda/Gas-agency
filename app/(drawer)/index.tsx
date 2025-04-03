import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.ProfileContainer}>
        <Image source={require("../../assets/images/icons/User.png")} />
        <Link href="./edit-profile">
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </Link>
      </View>

      <View style={styles.ProfileContainer}>
        <View style={styles.readContainer}>
          <Text style={styles.readLabel}>Name :</Text>
          <Text style={styles.readLabel}>Name xyz</Text>
        </View>
        <View style={styles.readContainer}>
          <Text style={styles.readLabel}>Phone Number :</Text>
          <Text style={styles.readLabel}>9988557744</Text>
        </View>
        <View style={styles.readContainer}>
          <Text style={styles.readLabel}>Email Address :</Text>
          <Text style={styles.readLabel}>xyz@gmail.com</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width : '100%',
    height : '100%',
    backgroundColor: '#f0f0f0',
  },
  ProfileContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  readContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  readLabel: {
    fontSize: 20,
    color: '#000',
  },
  editProfileText: {
    fontSize: 18,
    color: '#007bff', // Blue color for a link-like style
    marginTop: 10,
  },
})

export default Profile
