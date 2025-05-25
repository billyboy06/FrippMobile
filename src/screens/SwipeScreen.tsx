import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  PanResponder,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import SwipeCard from '../components/SwipeCard';
import { ClothingItem } from '../App';

interface SwipeScreenProps {
  items: ClothingItem[];
  onToggleLike: (itemId: string, isLiked: boolean) => void;
  likedItemIds: Set<string>;
}

const SwipeScreen: React.FC<SwipeScreenProps> = React.memo(({ 
  items, 
  onToggleLike, 
  likedItemIds 
}) => {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastSwipedItem, setLastSwipedItem] = useState<{
    index: number;
    direction: number;
    itemId: string;
  } | null>(null);

  const position = useRef(new Animated.ValueXY()).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const resetPosition = useCallback(() => {
    Animated.parallel([
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }),
      Animated.spring(rotate, {
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start();
  }, [position, rotate, opacity]);

  const swipeCard = useCallback((direction: number) => {
    if (currentIndex >= items.length) return;

    const item = items[currentIndex];
    const swipeOutX = direction * (width + 100);

    setLastSwipedItem({
      index: currentIndex,
      direction,
      itemId: item.id,
    });

    if (direction === 1) {
      onToggleLike(item.id, true);
      console.log('Liked:', item.name);
    } else {
      console.log('Disliked:', item.name);
    }

    Animated.parallel([
      Animated.timing(position, {
        toValue: { x: swipeOutX, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotate, {
        toValue: direction * 30,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setCurrentIndex(prev => prev + 1);
      position.setValue({ x: 0, y: 0 });
      rotate.setValue(0);
      opacity.setValue(1);
    });
  }, [currentIndex, items, width, onToggleLike, position, rotate, opacity]);

  const handleUndo = useCallback(() => {
    if (!lastSwipedItem || currentIndex === 0) return;

    const { direction, itemId } = lastSwipedItem;
    
    if (direction === 1) {
      onToggleLike(itemId, false);
      console.log('Unliked on undo:', items.find(item => item.id === itemId)?.name);
    }

    setCurrentIndex(prev => prev - 1);
    setLastSwipedItem(null);
    resetPosition();
  }, [lastSwipedItem, currentIndex, onToggleLike, items, resetPosition]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
      rotate.setValue(gesture.dx * 0.1);
    },
    onPanResponderRelease: (_, gesture) => {
      const threshold = width * 0.25;
      const velocity = gesture.vx;

      if (Math.abs(gesture.dx) > threshold || Math.abs(velocity) > 0.5) {
        const direction = gesture.dx > 0 ? 1 : -1;
        swipeCard(direction);
      } else {
        resetPosition();
      }
    },
  });

  // Reset cards when all are swiped
  React.useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setTimeout(() => {
        setCurrentIndex(0);
        setLastSwipedItem(null);
        resetPosition();
      }, 600);
    }
  }, [currentIndex, items.length, resetPosition]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const currentItem = items[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {currentItem && (
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  ...position.getTranslateTransform(),
                  { rotate: rotateInterpolate },
                ],
                opacity,
              },
            ]}
            {...panResponder.panHandlers}
          >
            <SwipeCard item={currentItem} />
          </Animated.View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => swipeCard(-1)}
          style={[styles.actionButton, styles.dislikeButton]}
          activeOpacity={0.8}
          accessibilityLabel="Dislike"
        >
          <Icon name="x" size={32} color="#FF5A69" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleUndo}
          style={[styles.actionButton, styles.undoButton]}
          activeOpacity={0.8}
          accessibilityLabel="Undo"
        >
          <Icon name="rotate-ccw" size={24} color="#9747FF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeCard(1)}
          style={[styles.actionButton, styles.likeButton]}
          activeOpacity={0.8}
          accessibilityLabel="Like"
        >
          <Icon name="heart" size={32} color="#3CD4CF" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  card: {
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: 'transparent',
    height: 100,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  dislikeButton: {
    width: 64,
    height: 64,
    shadowColor: '#FF5A69',
  },
  undoButton: {
    width: 48,
    height: 48,
    shadowColor: '#9747FF',
  },
  likeButton: {
    width: 64,
    height: 64,
    shadowColor: '#3CD4CF',
  },
});

export default SwipeScreen;