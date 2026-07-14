import { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  TouchableOpacity,
  Platform,
  StatusBar,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { trendingSongs } from '../../data/dummyData';
import SongCard from '../../components/SongCard';

// Mock data for the vibrant category grid
const browseCategories = [
  { id: 'c1', name: 'Podcasts', color: '#E13300' },
  { id: 'c2', name: 'Made For You', color: '#1E3264' },
  { id: 'c3', name: 'New Releases', color: '#E8115B' },
  { id: 'c4', name: 'Pop', color: '#148A08' },
  { id: 'c5', name: 'Hip-Hop', color: '#BC5900' },
  { id: 'c6', name: 'Workout', color: '#777777' },
  { id: 'c7', name: 'Chill', color: '#D84000' },
  { id: 'c8', name: 'Sleep', color: '#1E3264' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  // Filter songs based on whether the query matches the title or artist
  const filteredSongs = query 
    ? trendingSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Renders the colorful square cards when there is no search query
  const renderCategory = ({ item }: { item: typeof browseCategories[0] }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.color }]}
      activeOpacity={0.8}
      onPress={() => Keyboard.dismiss()}
    >
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Sticky Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Search</Text>
          
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#000" style={styles.searchIcon} />
           
           <TextInput 
             style={styles.input} 
             placeholder="What do you want to listen to?" 
             placeholderTextColor="#555"
              value={query}
             onChangeText={setQuery}
             autoCorrect={false}
             clearButtonMode="always"
             underlineColorAndroid="transparent" // 👉 Add this line
            />
            {/* Custom Clear Button for Android/Custom UI */}
            {query.length > 0 && Platform.OS !== 'ios' && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#555" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* State 1: User is NOT searching (Show Browse Grid) */}
        {query.length === 0 && (
          <>
            <Text style={styles.sectionTitle}>Browse all</Text>
            <FlatList
              data={browseCategories}
              keyExtractor={(item) => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.row}
              renderItem={renderCategory}
              keyboardShouldPersistTaps="handled"
            />
          </>
        )}

        {/* State 2: User is searching but NO results match */}
        {query.length > 0 && filteredSongs.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Couldn't find "{query}"</Text>
            <Text style={styles.emptySubtitle}>Try searching again using a different spelling or keyword.</Text>
          </View>
        )}

        {/* State 3: User is searching and results MATCH */}
        {query.length > 0 && filteredSongs.length > 0 && (
          <FlatList
            data={filteredSongs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <SongCard 
                id={item.id} 
                title={item.title} 
                artist={item.artist} 
                cover={item.cover} 
              />
            )}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 20 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // High contrast white bar
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: { 
  flex: 1,
  color: '#000', 
  fontSize: 16,
  fontWeight: '500',
  height: '100%',
  borderWidth: 0, 
  padding: 0, 
  outlineStyle: 'none', 
  } as any,
  clearButton: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space at bottom for tab bar
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 5, // Small gap between the two columns
    overflow: 'hidden',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: { 
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: { 
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#b3b3b3',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  }
});