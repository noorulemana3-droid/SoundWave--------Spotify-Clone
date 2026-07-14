import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface PlaylistCardProps {
  id: string;
  name: string;
  trackCount?: number;
  coverUrl?: string; 
}

export default function PlaylistCard({ id, name, trackCount, coverUrl }: PlaylistCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => console.log(`Maps to playlist ${id}`)} 
    >
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} style={styles.cover} />
      ) : (
        <View style={styles.placeholderCover} />
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{name}</Text>
        {trackCount !== undefined && (
          <Text style={styles.trackCount}>{trackCount} tracks</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  placeholderCover: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#404040', 
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  trackCount: {
    color: '#b3b3b3',
    fontSize: 14,
    marginTop: 4,
  },
});