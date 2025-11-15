import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../state/AuthProvider';
import GradientButton from '../components/GradientButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
  const { signOut, state } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.gridBtn}>
          <View style={styles.iconPlaceholder} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#0b2550' }}>
          Activity
        </Text>
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={{ position: 'absolute', right: 16 }}
        >
          <Text style={{ color: '#15C16B', fontWeight: '700' }}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Popular</Text>

        <View style={styles.card}>
          <View style={styles.cardImage} />
          <View style={{ padding: 12 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
              Wonderful building near London
            </Text>
            <Text style={{ color: '#fff', marginTop: 8 }}>
              Olivia Redman · 2 minutes ago
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 12 }}>
          <GradientButton title="Create New Post" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Welcome</Text>
        <Text style={{ color: '#7b8a98' }}>
          Hello, {state.user?.first_name || 'User'} — welcome to KareerConnect
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 64,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  gridBtn: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  iconPlaceholder: {
    width: 18,
    height: 18,
    backgroundColor: '#15C16B',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 12,
    color: '#0b2550',
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    height: 220,
    backgroundColor: '#0b4457',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    elevation: 3,
  },
  cardImage: { flex: 1, backgroundColor: '#cfcfcf' },
});
