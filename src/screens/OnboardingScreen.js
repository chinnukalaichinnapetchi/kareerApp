import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GradientButton from '../components/GradientButton';

const pages = [
  {
    key: '1',
    title: 'Kareer & Events',
    subtitle:
      'While you train, we bring you the relevant jobs and events to cater employment.',
    image: require('../../assets/logo.png'),
  },
  {
    key: '2',
    title: 'Learn & Grow',
    subtitle: 'Interactive lessons & community support.',
    image: require('../../assets/logo.png'),
  },
  {
    key: '3',
    title: 'Connect',
    subtitle: 'Network with professionals and employers.',
    image: require('../../assets/logo.png'),
  },
];

export default function OnboardingScreen({ navigation }) {
  const [idx, setIdx] = useState(0);

  const next = () => {
    if (idx < pages.length - 1) setIdx(idx + 1);
    else navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={pages[idx].image}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.middle}>
        <View style={styles.dots}>
          {pages.map((p, i) => (
            <View
              key={p.key}
              style={[
                styles.dot,
                i === idx ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>{pages[idx].title}</Text>

        <Text style={styles.subtitle}>{pages[idx].subtitle}</Text>
      </View>

      <View style={styles.bottom}>
        <GradientButton
          title={idx === pages.length - 1 ? 'Get Started' : 'Next'}
          onPress={next}
        />
        <TouchableOpacity
          style={{ marginTop: 12, alignItems: 'center' }}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={{ color: '#0b3558' }}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  logoContainer: {
    marginTop: 330,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 70,
  },

  middle: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 20,
    height: 20,
  },
  dot: {
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeDot: {
    width: 30,
    height: 8,
    backgroundColor: '#0ABE6E',
    borderRadius: 10,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    backgroundColor: '#A3A8AE',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0B1A3D',
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6D7485',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  bottom: {
    padding: 24,
  },
});
