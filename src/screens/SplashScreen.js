import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../state/AuthProvider';

export default function SplashScreen({ navigation }) {
  const { state } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => {
      if (state.token)
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      else navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    }, 900);
    return () => clearTimeout(t);
  }, [state.token]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9eef3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 220, height: 70 },
});
