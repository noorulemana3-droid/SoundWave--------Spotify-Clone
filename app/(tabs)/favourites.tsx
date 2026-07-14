import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../../context/MusicContext';
import { trendingSongs } from '../../data/dummyData';
import SongCard from '../../components/SongCard';

export default function FavoritesScreen() {
  const { favorites } = useMusic();

  // Map the saved favorite IDs to the actual song data from your dummy data
  const favoriteSongs = favorites
    .map(id => trendingSongs.find(song => song.id === id))
    .filter(Boolean); // Filters out any undefined results safely

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Premium Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Liked Songs</Text>
            <Text style={styles.trackCount}>
              {favoriteSongs.length} {favoriteSongs.length === 1 ? 'song' : 'songs'}
            </Text>
          </View>
          
          {/* Only show the play button if they actually have liked songs */}
          {favoriteSongs.length > 0 && (
            <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
              <Ionicons name="play" size={24} color="#000" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          )}
        </View>

        {/* State 1: NO Favorites */}
        {favoriteSongs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color="#404040" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No favorite tracks yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart on any song to add it to your favorites list.
            </Text>
          </View>
        ) : (
          /* State 2: HAS Favorites */
          <FlatList
            data={favoriteSongs}
            keyExtractor={(item) => item?.id || Math.random().toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (!item) return null;
              return (
                <SongCard 
                  id={item.id} 
                  title={item.title} 
                  artist={item.artist} 
                  cover={item.cover} 
                />
              );
            }}
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#121212',
    // Ensures the title isn't squished on Android or iOS
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  headerTitle: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff',
    letterSpacing: -0.5,
  },
  trackCount: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 5,
    fontWeight: '500',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#1DB954', // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100, // Extra space at bottom so the last song isn't hidden by the tab bar
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -50, // Visually centers it slightly higher on the screen
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#b3b3b3',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  }
});