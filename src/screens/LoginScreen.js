import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import GradientButton from '../components/GradientButton';
import api from '../services/api';
import { useAuth } from '../state/AuthProvider';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const payload = { email, password, remember_me: remember };
      const res = await api.login(payload);
      console.log(res, 'res');
      if (res.success) {
        const token = res.data.token;
        const user = res.data.user;
        await signIn(token, user);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else Alert.alert('Login Failed', res.message || 'Unknown error');
    } catch (err) {
      Alert.alert('Login error', err.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <View style={{ alignItems: 'center', marginTop: 286 }}>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 190, height: 70 }}
          resizeMode="stretch"
        />
      </View>
      <View style={{ padding: 24 }}>
        <Text style={styles.header}>Log In</Text>
        <TextInput
          placeholder="Email / Phone number"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={{ position: 'relative' }}>
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* eye icon placeholder */}
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setRemember(!remember)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <View
              style={[
                styles.checkbox,
                { backgroundColor: remember ? '#15C16B' : '#fff' },
              ]}
            />
            <Text style={{ marginLeft: 8 }}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('Forgot password', 'Implement reset flow')
            }
          >
            <Text style={{ color: '#0b5d86' }}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 18 }}>
          <GradientButton
            title={loading ? 'Please wait...' : 'Log In'}
            onPress={onLogin}
          />
        </View>

        <View style={{ alignItems: 'center', marginTop: 18 }}>
          <Text>
            Don't have an account?{' '}
            <Text
              style={{ color: '#15C16B', fontWeight: '700' }}
              onPress={() => navigation.navigate('Register')}
            >
              Register now!
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 22,
    color: '#0b2550',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
