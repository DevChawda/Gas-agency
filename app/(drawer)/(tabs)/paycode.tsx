import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaycodeScreen() {
    const router = useRouter();
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Paycode</Text>
            <Text style={styles.description}>Generate and manage payment codes for LPG and lubricants.</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
});