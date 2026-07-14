import { Stack } from 'expo-router';
import { MusicProvider } from '../context/MusicContext';

export default function RootLayout() {
  return (
    <MusicProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#121212' } }}>
        <Stack.Screen name="index" /> 
        <Stack.Screen name="login" />
        <Stack.Screen name="tabs" />
        
        {/* Dynamic Screens */}
        <Stack.Screen 
          name="album/[id]" 
          options={{ 
            headerShown: true, 
            title: 'Album Details', 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: '#fff',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="player/[id]" 
          options={{ presentation: 'modal' }} 
        />
      </Stack>
    </MusicProvider>
  );
}