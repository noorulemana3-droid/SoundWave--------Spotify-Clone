import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, 
      tabBarStyle: { backgroundColor: '#181818', borderTopWidth: 0 },
      tabBarActiveTintColor: '#1DB954',
      tabBarInactiveTintColor: '#b3b3b3'
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="search" 
        options={{ 
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="playLists" 
        options={{ 
          title: 'Playlists',
          tabBarIcon: ({ color }) => <Ionicons name="library" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="favourites" 
        options={{ 
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
        }} 
      />
    </Tabs>
  );
}