import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  ScrollView,
  SafeAreaView,
  Platform,      // 👉 Added for OS checking
  StatusBar      // 👉 Added for Android status bar height
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { trendingSongs } from '../../data/dummyData';
import { useMusic } from '../../context/MusicContext';

export default function MusicPlayerScreen() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite } = useMusic();
  
  const [isBuffering, setIsBuffering] = useState(true);
  
  const songId = Array.isArray(id) ? id[0] : id;
  const songData = trendingSongs.find(song => song.id === songId);
  const isFavorite = typeof songId === 'string' && favorites.includes(songId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBuffering(false);
    }, 1000); 
    
    return () => clearTimeout(timer);
  }, [id]);

  if (isBuffering) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={styles.loadingText}>Buffering audio...</Text>
      </View>
    );
  }

  if (!songData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Song not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* "Now Playing" Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-down" size={32} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.topBarTitle}>Now Playing</Text>
        
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Image source={{ uri: songData.cover }} style={styles.cover} />
        
        <View style={styles.infoRow}>
          <View style={styles.textColumn}>
            <Text style={styles.title} numberOfLines={1}>{songData.title}</Text>
            <Text style={styles.artist} numberOfLines={1}>{songData.artist}</Text>
          </View>
          
          <TouchableOpacity onPress={() => typeof songId === 'string' && toggleFavorite(songId)}>
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={32} 
              color={isFavorite ? "#1DB954" : "#fff"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <View style={styles.progressDot} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>1:14</Text>
            <Text style={styles.timeText}>-2:36</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <Ionicons name="shuffle-outline" size={28} color="#1DB954" />
          <Ionicons name="play-skip-back" size={38} color="#fff" />
          <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
            <Ionicons name="play" size={40} color="#000" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
          <Ionicons name="play-skip-forward" size={38} color="#fff" />
          <Ionicons name="repeat-outline" size={28} color="#fff" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#181818',
    // 👉 THE FIX: Safely pushes the top bar down below the Android status icons
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25, 
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 60, 
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#1DB954',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cover: { 
    width: 320, 
    height: 320, 
    borderRadius: 12, 
    marginBottom: 40, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 10 
  },
  infoRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, marginBottom: 30 },
  textColumn: { flex: 1, paddingRight: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  artist: { fontSize: 18, color: '#b3b3b3', marginTop: 5 },
  progressContainer: { width: '100%', paddingHorizontal: 10, marginBottom: 30 },
  progressBar: { width: '100%', height: 4, backgroundColor: '#404040', borderRadius: 2, flexDirection: 'row', alignItems: 'center' },
  progressFill: { width: '30%', height: '100%', backgroundColor: '#fff', borderRadius: 2 },
  progressDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', marginLeft: -6 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  timeText: { color: '#b3b3b3', fontSize: 12 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 },
  playButton: { width: 75, height: 75, borderRadius: 37.5, backgroundColor: '#1DB954', justifyContent: 'center', alignItems: 'center' }
});