import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 2000);

    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, fadeAnim]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { width, height, opacity: fadeAnim }
      ]}
    >
      <View style={styles.content}>
        {/* App Logo - Colorful Gradient Hanger Icon */}
        <View style={styles.logoContainer}>
          <Svg width={128} height={128} viewBox="0 0 512 512">
            <Defs>
              <LinearGradient id="hangerGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <Stop offset="0%" stopColor="#00E5FF" />
                <Stop offset="50%" stopColor="#9747FF" />
                <Stop offset="100%" stopColor="#FF5252" />
              </LinearGradient>
              <LinearGradient id="hookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#FF5252" />
                <Stop offset="100%" stopColor="#9747FF" />
              </LinearGradient>
            </Defs>
            
            {/* Hook part */}
            <Path 
              d="M256 60C256 40 276 20 300 20C324 20 344 40 344 60C344 80 324 100 300 120"
              stroke="url(#hookGradient)" 
              strokeWidth="30" 
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Hanger part */}
            <Path 
              d="M300 120L150 270C130 290 130 320 150 340C170 360 200 360 220 340L256 304L292 340C312 360 342 360 362 340C382 320 382 290 362 270L212 120" 
              stroke="url(#hangerGradient)" 
              strokeWidth="30" 
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>Fripp</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9747FF',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});

export default SplashScreen;