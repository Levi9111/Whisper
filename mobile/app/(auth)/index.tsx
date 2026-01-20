import {
  View,
  Dimensions,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import useAuthSocial from '@/hooks/useSocialAuth';

const { width, height } = Dimensions.get('window');

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useAuthSocial();

  const isLoading = loadingStrategy !== null;

  return (
    <View className='flex-1 bg-surface-dark'>
      {/*TODO: Animated Orbs */}

      <View className='absolute inset-0 overflow-hidden'></View>
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
