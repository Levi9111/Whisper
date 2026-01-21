import { useSSO } from '@clerk/clerk-expo';
import { useState, useRef } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

const useAuthSocial = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const inFlightRef = useRef(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });

        router.replace('/(tabs)');
        return;
      }
    } catch (error) {
      console.error('Social auth error:', error);
      const provider = strategy === 'oauth_google' ? 'Google' : 'Apple';
      Alert.alert(
        'Authentication Error',
        `Failed to authenticate with ${provider}. Please try again.`,
      );
    } finally {
      inFlightRef.current = false;
      setLoadingStrategy(null);
    }
  };

  return {
    handleSocialAuth,
    loadingStrategy,
  };
};

export default useAuthSocial;
