import { Ionicons } from '@expo/vector-icons';

import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';

import {
  AnimatedOrb,
  OrbBackground,
  OrbPresets,
} from '@/components/AnimatedOrb';
import useAuthSocial from '@/hooks/useSocialAuth';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();

  const isLoading = loadingStrategy !== null;

  return (
    <View className='flex-1 bg-surface-dark'>
      <View className='absolute inset-0 overflow-hidden'>
        <AnimatedOrb
          colors={['#F4A261', '#E76F51']}
          size={300}
          initialX={-80}
          initialY={height * 0.1}
          duration={4000}
        />
        <AnimatedOrb
          colors={['#8B5CF6', '#6366F1']}
          size={120}
          initialX={50}
          initialY={100}
          duration={4000}
        />
        <AnimatedOrb
          {...OrbPresets.purple}
          size={120}
          initialX={50}
          initialY={100}
        />
        <AnimatedOrb
          colors={['#FF6B6B', '#FFE66D']}
          size={150}
          initialX={0}
          initialY={0}
          duration={3000}
          opacity={0.4}
          xRange={50}
          yRange={30}
          scaleMin={0.8}
          scaleMax={1.3}
          blur={true}
          zIndex={5}
        />
        <OrbBackground
          orbs={[
            { preset: 'purple', size: 120, x: 0, y: 20 },
            { preset: 'pink', size: 100, x: 250, y: 60, opacity: 0.3 },
            { preset: 'cyan', size: 80, x: 200, y: 150 },
          ]}
        />
        <BlurView
          intensity={70}
          tint='dark'
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      </View>

      <SafeAreaView className='flex-1'>
        {/* Top section */}
        <View className='items-center pt-10'>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: 100,
              height: 100,
              marginVertical: -20,
            }}
            contentFit='contain'
          />
          <Text className='text-primary text-4xl font-bold font-serif tracking-wider uppercase px-4'>
            Whisper
          </Text>
        </View>
        {/* center section */}
        <View className='flex-1 justify-center items-center px-6'>
          <Image
            source={require('../../assets/images/auth.png')}
            style={{
              width: width - 48,
              height: height * 0.3,
            }}
            contentFit='contain'
          />
          {/* headline */}
          <View className='mt-6 items-center'>
            <Text className='text-5xl font-bold text-foreground text-center font-sans'>
              Connect & Chat
            </Text>
            <Text className='text-3xl font-bold text-primary font-mono'>
              Seamlessly
            </Text>
          </View>
        </View>

        {/* AUTH btns */}
        <View className='px-6 pb-20'>
          <View className='flex-row gap-4'>
            {/* Google btn */}
            <Pressable
              className='flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]'
              disabled={isLoading}
              accessibilityRole='button'
              accessibilityLabel='Continue with Google'
              onPress={() => !isLoading && handleSocialAuth('oauth_google')}
            >
              {loadingStrategy === 'oauth_google' ? (
                <ActivityIndicator size='small' color='#1a1a1a' />
              ) : (
                <>
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    contentFit='contain'
                  />
                  <Text className='text-gray-900 font-semibold text-sm'>
                    Google
                  </Text>
                </>
              )}
            </Pressable>

            {/* Apple btn */}
            <Pressable
              className='flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl active:scale-[0.97]'
              disabled={isLoading}
              accessibilityRole='button'
              accessibilityLabel='Continue with Apple'
              onPress={() => !isLoading && handleSocialAuth('oauth_apple')}
            >
              {loadingStrategy === 'oauth_apple' ? (
                <ActivityIndicator size='small' color='#ffffff' />
              ) : (
                <>
                  <Ionicons name='logo-apple' size={20} color={'#FFFFFF'} />
                  <Text className='text-foreground font-semibold text-sm'>
                    Apple
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
