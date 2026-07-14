import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  RefreshControl, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { trendingSongs, popularArtists } from '../../data/dummyData';
import SongCard from '../../components/SongCard';
import ArtistCard from '../../components/ArtistCard';
import Loader from '../../components/Loader';

export default function HomeScreen() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMusicData = () => {
    setTimeout(() => {
      setSongs(trendingSongs);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => { fetchMusicData(); }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMusicData();
  };

  // Dynamic greeting based on the current time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // We pack the top elements into a ListHeaderComponent so everything scrolls smoothly together
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      
      {/* Top Action Row */}
      <View style={styles.topRow}>
        <Text style={styles.greetingTitle}>{getGreeting()}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="time-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Horizontal Artist List */}
      <Text style={styles.sectionTitle}>Popular Artists</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={popularArtists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <ArtistCard id={item.id} name={item.name} imageUrl={item.imageUrl} />
        )}
      />

      <Text style={[styles.sectionTitle, styles.trendingMargin]}>Trending Now</Text>
    </View>
  );

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1DB954" />
          }
          renderItem={({ item }) => (
            <SongCard id={item.id} title={item.title} artist={item.artist} cover={item.cover} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    // This padding pushes everything down safely below Android/iOS status bars
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greetingTitle: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#fff',
    letterSpacing: -0.5,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 15,
  },
  trendingMargin: {
    marginTop: 25, // Gives extra breathing room between the artists and the songs
  },
  horizontalList: {
    paddingBottom: 10,
  }
});