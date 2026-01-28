import { Ionicons } from '@expo/vector-icons';

import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';

import { useAuth, useUser } from '@clerk/clerk-expo';

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline', label: 'Edit Profile', color: '#F4A261' },
      {
        icon: 'shield-checkmark-outline',
        label: 'Privacy & Security',
        color: '#10B981',
      },
      {
        icon: 'notifications-outline',
        label: 'Notifications',
        value: 'On',
        color: '#8B5CF6',
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        icon: 'moon-outline',
        label: 'Dark Mode',
        value: 'On',
        color: '#6366F1',
      },
      {
        icon: 'language-outline',
        label: 'Language',
        value: 'English',
        color: '#EC4899',
      },
      {
        icon: 'cloud-outline',
        label: 'Data & Storage',
        value: '1.2 GB',
        color: '#14B8A6',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Help Center', color: '#F59E0B' },
      { icon: 'chatbubble-outline', label: 'Contact Us', color: '#3B82F6' },
      { icon: 'star-outline', label: 'Rate the App', color: '#F4A261' },
    ],
  },
];

const ProfileTab = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className='flex-1 bg-surface'
    >
      <ScrollView
        className='bg-surface-dark'
        contentInsetAdjustmentBehavior='automatic'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className='relative pb-8'>
          <View className='items-center mt-16'>
            <View className='relative'>
              {/* Glow effect */}
              <View className='absolute -inset-2 bg-primary/30 rounded-full blur-xl' />

              <View className='relative rounded-full border-4 border-white shadow-2xl'>
                <Image
                  source={user?.imageUrl}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 999,
                  }}
                />
              </View>

              {/* Camera Button with Shadow */}
              <Pressable className='absolute bottom-0 right-0 size-10 bg-primary rounded-full items-center justify-center border-4 border-white shadow-lg active:scale-95'>
                <Ionicons name='camera' size={18} color='#0D0D0F' />
              </Pressable>
            </View>

            {/* Name & Email with better spacing */}
            <Text className='text-3xl font-bold text-foreground mt-6'>
              {user?.firstName} {user?.lastName}
            </Text>

            <Text className='text-muted-foreground mt-2 text-base'>
              {user?.emailAddresses[0]?.emailAddress}
            </Text>

            {/* Enhanced Status Badge */}
            <View className='flex-row items-center mt-4 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30'>
              <View className='size-2.5 bg-green-500 rounded-full mr-2 animate-pulse' />
              <Text className='text-green-500 text-sm font-semibold'>
                Active Now
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Cards (Optional Enhancement) */}
        <View className='flex-row mx-5 mb-6 gap-3'>
          <View className='flex-1 bg-surface-card rounded-2xl p-4 border border-surface-light'>
            <Text className='text-subtle-foreground text-xs font-medium'>
              Following
            </Text>
            <Text className='text-foreground text-2xl font-bold mt-1'>328</Text>
          </View>
          <View className='flex-1 bg-surface-card rounded-2xl p-4 border border-surface-light'>
            <Text className='text-subtle-foreground text-xs font-medium'>
              Followers
            </Text>
            <Text className='text-foreground text-2xl font-bold mt-1'>
              1.2K
            </Text>
          </View>
          <View className='flex-1 bg-surface-card rounded-2xl p-4 border border-surface-light'>
            <Text className='text-subtle-foreground text-xs font-medium'>
              Posts
            </Text>
            <Text className='text-foreground text-2xl font-bold mt-1'>89</Text>
          </View>
        </View>

        {/* Enhanced Menu Sections */}
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <View className='mt-4 mx-5' key={section.title}>
            <Text className='text-subtle-foreground text-xs font-bold uppercase tracking-wider mb-3 ml-1'>
              {section.title}
            </Text>

            <View className='bg-surface-card rounded-2xl overflow-hidden border border-surface-light shadow-sm'>
              {section.items.map((item, index) => (
                <Pressable
                  key={item.label}
                  className={`flex-row items-center px-5 py-4 active:bg-surface-light
                    ${index < section.items.length - 1 ? 'border-b border-surface-light' : ''}
                  `}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                >
                  {/* Icon with colored background */}
                  <View
                    className='size-11 rounded-xl items-center justify-center'
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={22}
                      color={item.color}
                    />
                  </View>

                  <Text className='flex-1 ml-4 text-foreground font-semibold text-base'>
                    {item.label}
                  </Text>

                  {item.value && (
                    <View className='bg-surface-light px-3 py-1.5 rounded-lg mr-2'>
                      <Text className='text-subtle-foreground text-sm font-medium'>
                        {item.value}
                      </Text>
                    </View>
                  )}

                  <Ionicons name='chevron-forward' size={20} color='#6B6B70' />
                </Pressable>
              ))}
            </View>
          </View>
        ))}

        {/* Enhanced Logout Button */}
        <Pressable
          className='mx-5 mt-8 bg-red-500/10 rounded-2xl py-4 items-center active:scale-[0.98] border border-red-500/30 shadow-sm'
          onPress={() => signOut()}
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <View className='flex-row items-center'>
            <Ionicons name='log-out-outline' size={22} color='#EF4444' />
            <Text className='ml-2 text-red-500 font-bold text-base'>
              Log Out
            </Text>
          </View>
        </Pressable>

        {/* App Version */}
        <Text className='text-center text-subtle-foreground text-xs mt-8'>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;
