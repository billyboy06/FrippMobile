import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { ClothingItem } from '../App';

interface SwipeCardProps {
  item: ClothingItem;
}

const SwipeCard: React.FC<SwipeCardProps> = React.memo(({ item }) => {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 64, 300);
  
  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.gradient} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.tags}>
            <View style={styles.sizeTag}>
              <Text style={styles.tagText}>{item.size}</Text>
            </View>
            <View style={styles.conditionTag}>
              <Text style={styles.tagText}>{item.condition}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    height: 460,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'transparent',
    // React Native doesn't support CSS gradients, we'll use a semi-transparent overlay
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeTag: {
    backgroundColor: 'rgba(151, 71, 255, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  conditionTag: {
    backgroundColor: 'rgba(60, 212, 207, 0.3)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  brand: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default SwipeCard;