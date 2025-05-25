import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SwipeScreen from './screens/SwipeScreen';
import Header from './components/Header';
import FavoritesScreen from './screens/FavoritesScreen';
import SplashScreen from './components/SplashScreen';

export interface ClothingItem {
  id: string;
  name: string;
  price: string;
  size: string;
  brand: string;
  imageUrl: string;
  description: string;
  condition: string;
}

const initialItemsData: ClothingItem[] = [
  { 
    id: '1', 
    name: 'Vintage Denim Jacket', 
    price: '$45', 
    size: 'M', 
    brand: 'Levi\'s', 
    imageUrl: 'https://picsum.photos/seed/picsum1/300/400', 
    description: 'Classic 80s denim jacket, slightly faded.', 
    condition: 'Good' 
  },
  { 
    id: '2', 
    name: 'Floral Maxi Dress', 
    price: '$60', 
    size: 'S', 
    brand: 'Zara', 
    imageUrl: 'https://picsum.photos/seed/picsum2/300/400', 
    description: 'Beautiful summer dress, worn once.', 
    condition: 'Excellent' 
  },
  { 
    id: '3', 
    name: 'Striped Cotton Shirt', 
    price: '$25', 
    size: 'L', 
    brand: 'H&M', 
    imageUrl: 'https://picsum.photos/seed/picsum3/300/400', 
    description: 'Comfortable everyday shirt.', 
    condition: 'Very Good' 
  },
  { 
    id: '4', 
    name: 'Leather Ankle Boots', 
    price: '$80', 
    size: '38', 
    brand: 'Dr. Martens', 
    imageUrl: 'https://picsum.photos/seed/picsum4/300/400', 
    description: 'Iconic boots, some wear and tear.', 
    condition: 'Fair' 
  },
  { 
    id: '5', 
    name: 'Knit Sweater', 
    price: '$35', 
    size: 'M', 
    brand: 'Uniqlo', 
    imageUrl: 'https://picsum.photos/seed/picsum5/300/400', 
    description: 'Warm and cozy, perfect for winter.', 
    condition: 'Like New' 
  },
];

type ViewType = 'swipe' | 'favorites';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('swipe');
  const [likedItemIds, setLikedItemIds] = useState<Set<string>>(new Set());
  const [allItems] = useState<ClothingItem[]>(initialItemsData);
  const [showSplash, setShowSplash] = useState(true);
  const { width, height } = useWindowDimensions();

  const navigateToSwipe = React.useCallback(() => {
    setCurrentView('swipe');
  }, []);

  const navigateToFavorites = React.useCallback(() => {
    setCurrentView('favorites');
  }, []);

  const handleToggleLike = React.useCallback((itemId: string, isLiked: boolean) => {
    setLikedItemIds(prevIds => {
      const newIds = new Set(prevIds);
      if (isLiked) {
        newIds.add(itemId);
      } else {
        newIds.delete(itemId);
      }
      return newIds;
    });
  }, []);

  const likedItemsData = React.useMemo(() => 
    allItems.filter(item => likedItemIds.has(item.id)), 
    [allItems, likedItemIds]
  );

  const handleSplashComplete = React.useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <SplashScreen onComplete={handleSplashComplete} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <View style={[styles.app, { width, height }]}>
          <Header 
            onNavigateToFavorites={navigateToFavorites} 
            onNavigateToProfile={navigateToSwipe} 
            currentView={currentView}
          />
          <View style={styles.content}>
            {currentView === 'swipe' && (
              <SwipeScreen 
                items={allItems}
                onToggleLike={handleToggleLike} 
                likedItemIds={likedItemIds}
              />
            )}
            {currentView === 'favorites' && (
              <FavoritesScreen 
                likedItems={likedItemsData} 
                navigateToSwipe={navigateToSwipe} 
                onToggleLike={handleToggleLike}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  app: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  content: {
    flex: 1,
  },
});

export default App;