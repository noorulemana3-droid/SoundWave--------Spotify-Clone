import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ArtistCardProps {
  id: string;
  name: string;
  imageUrl: string;
}

export default function ArtistCard({ id, name, imageUrl }: ArtistCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => console.log(`Maps to artist ${id}`)}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginRight: 20, 
    width: 100,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45, // Creates the perfect circle
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});