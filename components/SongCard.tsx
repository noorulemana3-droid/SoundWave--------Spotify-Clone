import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  cover: string;
}

export default function SongCard({ id, title, artist, cover }: SongCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/album/${id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: cover }} style={styles.cover} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{artist}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#282828', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 15,
    alignItems: 'center'
  },
  cover: { 
    width: 60, 
    height: 60, 
    borderRadius: 5, 
    marginRight: 15 
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  title: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  artist: { 
    color: '#b3b3b3', 
    fontSize: 14, 
    marginTop: 4 
  },
});