import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMusic } from '../../context/MusicContext';
import PlaylistCard from '../../components/PlayListCard';

export default function PlaylistsScreen() {
  const { playlists, addPlaylist } = useMusic();
  
  // State to control our new popup modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleSavePlaylist = () => {
    // Only save if they actually typed something (ignoring blank spaces)
    if (newPlaylistName.trim().length > 0) {
      addPlaylist(newPlaylistName.trim());
      setNewPlaylistName(''); // Clear the input
      setIsModalVisible(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setNewPlaylistName('');
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Premium Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Library</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)} activeOpacity={0.7} style={styles.headerIcon}>
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Playlists List */}
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            // The Action Row
            <TouchableOpacity 
              style={styles.createRow} 
              onPress={() => setIsModalVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.createIconBg}>
                <Ionicons name="add" size={30} color="#000" />
              </View>
              <Text style={styles.createText}>Add New Playlist</Text>
            </TouchableOpacity>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No Playlists Yet</Text>
              <Text style={styles.emptySubtitle}>
                Create your first playlist to start building your ultimate library.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <PlaylistCard 
              id={item.id} 
              name={item.name} 
              trackCount={item.trackCount} 
              coverUrl="https://images.unsplash.com/photo-1614613535308-eb51bd3d2c17?q=80&w=200&auto=format&fit=crop"
            />
          )}
        />
      </View>

      {/* --- THE CUSTOM NAMING MODAL --- */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel} // Handles the Android physical back button
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Name your playlist</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Late Night Drive"
              placeholderTextColor="#888"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              autoFocus={true} // Automatically brings up the keyboard!
              selectionColor="#1DB954"
            />
            
            <View style={styles.modalButtonRow}>
              <TouchableOpacity onPress={handleCancel} style={styles.modalButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleSavePlaylist} 
                style={[styles.modalButton, styles.createButton]}
                // Disable the create button if the text is empty
                disabled={newPlaylistName.trim().length === 0}
              >
                <Text style={[
                  styles.createButtonText, 
                  newPlaylistName.trim().length === 0 && styles.disabledText
                ]}>
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerIcon: {
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, 
  },
  createRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  createIconBg: {
    width: 60,
    height: 60,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4, 
  },
  createText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtitle: {
    color: '#b3b3b3',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#282828', // Dark grey box
    width: '100%',
    borderRadius: 12,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#404040',
    color: '#fff',
    fontSize: 16,
    padding: 15,
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954', // Spotify green accent
    marginBottom: 25,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#1DB954',
  },
  createButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledText: {
    color: 'rgba(0,0,0,0.4)', // Dimmed text if they haven't typed anything yet
  }
});