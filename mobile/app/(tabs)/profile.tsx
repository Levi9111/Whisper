import { useAuth } from '@clerk/clerk-expo';
import { Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className='flex-1 bg-surface'
    >
      <ScrollView
        className='flex-1'
        // Only works on ios
        contentInsetAdjustmentBehavior='automatic'
      >
        <Text className='text-white p-3'>Profile Tab</Text>

        <Pressable
          onPress={() => signOut()}
          className='mx-6 my-8 bg-red-500/10 border border-red-500/30 py-4 rounded-xl active:bg-red-500/20'
        >
          <Text className='text-red-400 text-center font-semibold text-base'>
            Sign Out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;
