import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// 👉 NEW: Import your context
import { useMusic } from '../context/MusicContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 👉 NEW: Grab the setUsername function
  const { setUsername } = useMusic();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Hold on', 'Please enter both your email and password to continue.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // 👉 NEW: Save the username! (Takes "taylor" out of "taylor@swift.com")
      const extractedName = email.split('@')[0];
      setUsername(extractedName);
      
      // Route to the main tabs
      router.replace('/(tabs)');
    }, 1500); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            
            <View style={styles.header}>
              <Ionicons name="musical-notes" size={50} color="#1DB954" />
              <Text style={styles.logoText}>SoundWave</Text>
              <Text style={styles.subtitle}>Millions of songs. Free on SoundWave.</Text>
            </View>

            <View style={styles.inputGroup}>
              <TextInput 
                style={styles.input} 
                placeholder="Email or username" 
                placeholderTextColor="#888" 
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail} 
                value={email}
                editable={!isLoading}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#888" 
                secureTextEntry 
                autoCapitalize="none"
                onChangeText={setPassword} 
                value={password}
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin} 
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Sign up flow will go here!')}>
              <Text style={styles.signUpText}> Sign up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  keyboardView: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'space-between' },
  formContainer: { paddingHorizontal: 30, paddingTop: 80, paddingBottom: 20 },
  header: { alignItems: 'center', marginBottom: 50 },
  logoText: { fontSize: 36, fontWeight: '800', color: '#fff', marginTop: 10, letterSpacing: -1 },
  subtitle: { color: '#b3b3b3', fontSize: 16, marginTop: 10, fontWeight: '500' },
  inputGroup: { marginBottom: 20 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 8, marginBottom: 15, fontSize: 16, borderWidth: 1, borderColor: '#333' },
  loginButton: { backgroundColor: '#1DB954', paddingVertical: 18, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#1DB954', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5, height: 60 },
  loginButtonDisabled: { backgroundColor: '#14833b', shadowOpacity: 0 },
  loginButtonText: { color: '#000', fontWeight: 'bold', fontSize: 18, letterSpacing: 0.5 },
  forgotPassword: { alignItems: 'center', marginTop: 25 },
  forgotPasswordText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 30, borderTopWidth: 1, borderTopColor: '#282828', marginHorizontal: 30, marginTop: 20 },
  footerText: { color: '#b3b3b3', fontSize: 14, fontWeight: '500' },
  signUpText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});