import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Platform, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMusic } from '../../context/MusicContext';

// A reusable component for the settings menu rows
const SettingsRow = ({ icon, title, isDestructive = false, onPress }: any) => (
  <TouchableOpacity style={styles.settingsRow} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.settingsLeft}>
      <Ionicons name={icon} size={24} color={isDestructive ? '#ff4d4d' : '#b3b3b3'} />
      <Text style={[styles.settingsTitle, isDestructive && { color: '#ff4d4d' }]}>
        {title}
      </Text>
    </View>
    {!isDestructive && <Ionicons name="chevron-forward" size={20} color="#404040" />}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  // Grab the dynamically saved username from your Context!
  const { username, setUsername } = useMusic();

  const handleLogout = () => {
    // Clear the username and send them back to the login screen
    setUsername('');
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.avatar} 
          />
          {/* Displays the username they logged in with! */}
          <Text style={styles.username}>@{username || 'Guest'}</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Playlists</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>148</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <SettingsRow icon="person-outline" title="Personal Information" />
          <SettingsRow icon="shield-checkmark-outline" title="Security & Privacy" />
          <SettingsRow icon="notifications-outline" title="Notifications" />
          <SettingsRow icon="cellular-outline" title="Audio Quality & Data" />
          <SettingsRow icon="color-palette-outline" title="Appearance" />
          
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>About</Text>
          <SettingsRow icon="information-circle-outline" title="Version 1.0.0" />
          <SettingsRow icon="help-buoy-outline" title="Help & Support" />
          
          {/* Log Out Button */}
          <View style={styles.logoutContainer}>
            <SettingsRow 
              icon="log-out-outline" 
              title="Log Out" 
              isDestructive={true} 
              onPress={handleLogout} 
            />
          </View>
        </View>

      </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#1DB954',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b3b3b3',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  statBlock: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#b3b3b3',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#282828',
  },
  menuContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsTitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutContainer: {
    marginTop: 30,
  }
});