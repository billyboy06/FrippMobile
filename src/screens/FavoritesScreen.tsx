import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ClothingItem } from '../App';

interface LikedItemCardProps {
  item: ClothingItem;
  onToggleLike: (itemId: string, isLiked: boolean) => void;
}

const LikedItemCard: React.FC<LikedItemCardProps> = React.memo(({ item, onToggleLike }) => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
        <View style={styles.priceTag}>
          <Text style={styles.priceTagText}>{item.price}</Text>
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.itemTags}>
          <View style={styles.sizeTag}>
            <Text style={styles.sizeTagText}>{item.size}</Text>
          </View>
          <View style={styles.conditionTag}>
            <Text style={styles.conditionTagText}>{item.condition}</Text>
          </View>
        </View>
        <Text style={styles.itemBrand}>{item.brand}</Text>
      </View>
    </View>
  );
});

interface FavoritesScreenProps {
  likedItems: ClothingItem[];
  navigateToSwipe: () => void;
  onToggleLike: (itemId: string, isLiked: boolean) => void;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = React.memo(({ 
  likedItems, 
  navigateToSwipe, 
  onToggleLike 
}) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 3 : 2;

  const renderItem = ({ item }: { item: ClothingItem }) => (
    <LikedItemCard item={item} onToggleLike={onToggleLike} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <Icon name="heart" size={32} color="#9747FF" />
      </View>
      <Text style={styles.emptyTitle}>Vous n'avez pas encore aimé d'articles !</Text>
      <Text style={styles.emptySubtitle}>
        Retournez à l'écran de swipe pour découvrir des vêtements
      </Text>
      <TouchableOpacity 
        onPress={navigateToSwipe}
        style={styles.startSwipingButton}
        activeOpacity={0.8}
      >
        <Icon name="arrow-left" size={16} color="#FFFFFF" style={styles.buttonIcon} />
        <Text style={styles.startSwipingText}>Commencer à swiper</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={navigateToSwipe}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Icon name="arrow-left" size={20} color="#9747FF" />
          <Text style={styles.backButtonText}>Retour aux Swipes</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Vos Articles Préférés</Text>
      </View>

      {likedItems.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 24,
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  backButtonText: {
    color: '#9747FF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D2A35',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 25,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 192,
  },
  priceTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5A69',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D2A35',
    marginBottom: 8,
  },
  itemTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  sizeTag: {
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  sizeTagText: {
    color: '#9747FF',
    fontSize: 12,
    fontWeight: '500',
  },
  conditionTag: {
    backgroundColor: 'rgba(60, 212, 207, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  conditionTagText: {
    color: '#3CD4CF',
    fontSize: 12,
    fontWeight: '500',
  },
  itemBrand: {
    fontSize: 14,
    color: '#5E5A6B',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 40,
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5E5A6B',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8C8A97',
    textAlign: 'center',
    marginBottom: 24,
  },
  startSwipingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9747FF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  startSwipingText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default FavoritesScreen;