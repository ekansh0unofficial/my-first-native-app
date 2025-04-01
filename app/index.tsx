import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput, Button, Text } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { app } from '../firebaseConfig'; // Ensure path is correct

const auth = getAuth(app); // Initialize Firebase Auth

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign Up Logic
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Account created successfully!');
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Successfully signed in!');
      }
    } catch (error) {
      // Handle Firebase errors
      if (error instanceof FirebaseError) {
        const firebaseError = error as FirebaseError;
        switch (firebaseError.code) {
          case 'auth/invalid-email':
            Alert.alert('Invalid email format.');
            break;
          case 'auth/user-not-found':
            Alert.alert('No user found with this email.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Incorrect password.');
            break;
          case 'auth/email-already-in-use':
            Alert.alert('Email is already in use.');
            break;
          default:
            Alert.alert('An error occurred. Please try again.');
            break;
        }
      } else {
        Alert.alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title={isSignUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />

      <Text style={styles.link} onPress={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    color: '#007BFF',
  },
});

export default Index;
