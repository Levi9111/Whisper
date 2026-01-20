import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatsTab = () => {
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
        <Text className='text-white p-3'>ChatsTab</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsTab;
