import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import GradientButton from '../components/GradientButton';
import api from '../services/api';
import { useAuth } from '../state/AuthProvider';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    if (!firstName || !email || !password) {
      Alert.alert('Validation', 'Please fill required fields');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        mobile_number: mobile,
      };
      console.log(payload, 'payload');
      const res = await api.register(payload);
      console.log(res, 'res');

      if (res.success) {
        const token = res.data.token;
        const user = res.data.user;
        await register(token, user);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else Alert.alert('Register Failed', res.message || 'Unknown error');
    } catch (err) {
      console.log('REGISTER ERROR RAW:', err);
      console.log('REGISTER ERROR SERVER RESPONSE:', err.response?.data);
      //Alert.alert('Register error', JSON.stringify(err, null, 2));
      Alert.alert('Register error', err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <View style={{ padding: 20, marginTop: 30 }}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Enter your basic details</Text>

        <TextInput
          placeholder="First Name"
          style={styles.inputBox}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.inputBox}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Email"
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.inputBox}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Mobile number"
          style={styles.inputBox}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />

        <View style={{ marginTop: 12 }}>
          <GradientButton
            title={loading ? 'Please wait...' : 'Next'}
            onPress={onRegister}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0b2550',
    marginTop: 8,
    textAlign: 'left',
  },
  subtitle: { color: '#8b96a6', marginTop: 6, marginBottom: 12 },
  inputBox: {
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 14,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
});
