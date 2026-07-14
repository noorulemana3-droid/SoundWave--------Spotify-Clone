import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { trendingSongs } from '../../data/dummyData';
import Loader from '../../components/Loader';

export default function AlbumDetailsScreen() {
  const { id } = useLocalSearchParams(); 
  const [isLoading, setIsLoading] = useState(true);
  
  // Safely extract the ID
  const albumId = Array.isArray(id) ? id[0] : id;
  const albumData = trendingSongs.find(song => song.id === albumId);

  // Simulate a network request fetching the album data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 0.8 second loading delay
    
    return () => clearTimeout(timer);
  }, [id]);

  // Show the loader while fetching
  if (isLoading) {
    return <Loader />;
  }

  // Fallback if data is missing
  if (!albumData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Album not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Pinned Top Bar with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: albumData.cover }} style={styles.cover} />
          <Text style={styles.title}>{albumData.title}</Text>
          <Text style={styles.artist}>{albumData.artist}</Text>
          
          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} onPress={() => router.push(`/player/${albumData.id}`)}>
            <Ionicons name="play" size={24} color="#000" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Tracks</Text>
        
        <TouchableOpacity style={styles.track} onPress={() => router.push(`/player/${albumData.id}`)}>
          <Text style={styles.trackNumber}>1</Text>
          <View style={styles.trackInfo}>
            <Text style={styles.trackText}>{albumData.title}</Text>
            <Text style={styles.trackArtist}>{albumData.artist}</Text>
          </View>
          <Ionicons name="ellipsis-vertical" size={20} color="#b3b3b3" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
    // Ensures Android status bar doesn't overlap the top bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#121212',
    zIndex: 10, // Keeps the button on top
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle circular background so it's easy to press
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#121212' 
  },
  errorText: { 
    color: '#fff', 
    fontSize: 18 
  },
  header: { 
    alignItems: 'center', 
    padding: 40, 
    paddingTop: 10, // Reduced padding since we now have the top bar
    borderBottomWidth: 1, 
    borderBottomColor: '#282828', 
    position: 'relative' 
  },
  cover: { 
    width: 220, 
    height: 220, 
    borderRadius: 12, 
    marginBottom: 25, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 15 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center' 
  },
  artist: { 
    fontSize: 18, 
    color: '#b3b3b3', 
    marginTop: 8 
  },
  playButton: { 
    position: 'absolute', 
    bottom: -28, 
    right: 30, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#1DB954', 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#fff', 
    margin: 20, 
    marginTop: 40 
  },
  track: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    paddingHorizontal: 20 
  },
  trackNumber: { 
    color: '#b3b3b3', 
    fontSize: 16, 
    marginRight: 20, 
    width: 15 
  },
  trackInfo: { 
    flex: 1 
  },
  trackText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  trackArtist: { 
    color: '#b3b3b3', 
    fontSize: 14, 
    marginTop: 4 
  }
});