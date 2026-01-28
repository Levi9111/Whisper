import { Ionicons } from '@expo/vector-icons';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';

import ChatItem from '@/components/ChatItem';
import EmptyUI from '@/components/EmptyUI';
import { useChats } from '@/hooks/useChats';
import { Chat } from '@/types';

const Header = () => {
  const router = useRouter();

  return (
    <View className='px-5 pt-10 pb-4'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-foreground'>Chats</Text>
        <Pressable
          className='size-10 bg-primary rounded-full items-center justify-center
        '
          // onPress={() => router.push('new-chat')}
        >
          <Ionicons name='create-outline' size={20} color={'#0D0D0F'} />
        </Pressable>
      </View>
    </View>
  );
};

const ChatsTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error, refetch } = useChats();

  // 🔄 Loading state
  if (isLoading) {
    return (
      <View className='flex-1 bg-surface items-center justify-center'>
        <ActivityIndicator size='large' color='#F4A261' />
      </View>
    );
  }

  // ❌ Error state
  if (error) {
    return (
      <SafeAreaView className='flex-1 bg-surface'>
        <View className='flex-1 items-center justify-center px-6'>
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={48}
            color='#9CA3AF'
          />

          <Text className='mt-4 text-lg font-semibold text-foreground'>
            Couldn’t load chats
          </Text>

          <Text className='mt-2 text-center text-sm text-muted-foreground'>
            Something went wrong while fetching your conversations.
          </Text>

          <Pressable
            onPress={() => refetch()}
            className='mt-6 rounded-xl bg-primary px-6 py-3 active:scale-95'
          >
            <Text className='font-semibold text-primary-foreground'>
              Try again
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: '/chat/[id]',
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      },
    });
  };

  // ✅ Normal state
  return (
    <View className='flex-1 bg-surface'>
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handleChatPress(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title='No Chats yet'
            subtitle='Start a conversation'
            iconName='chatbubbles-outline'
            iconColor='#6B6B70'
            iconSize={64}
            buttonLabel='New Chat'
            onPressButton={() => console.log('Pressed')}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;
