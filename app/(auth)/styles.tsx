import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E8', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 100, 
    height: 100, 
    marginBottom: 10,
    backgroundRepeat: 'no-repeat',
    backgroundPosition : 'center',
    objectFit : 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: "#EB4343",
    padding: 5,
    borderRadius: 20,
    width: '80%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '48%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  inactiveButton: {
    backgroundColor: '#EB4343',
  },
  activeText: {
    color: '#EB4343',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#EB4343',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#EB4343',
    textAlign: 'center',
    marginTop: 10,
  },
});
