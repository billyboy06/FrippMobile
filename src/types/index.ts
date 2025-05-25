export interface Item {
  id: string;
  name: string;
  price: string;
  size: string;
  brand: string;
  imageUrl: string;
  description: string;
  condition: string;
}

export interface SwipeCardProps {
  item: Item;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop?: boolean;
}

export interface SwipeScreenProps {
  items: Item[];
  onToggleLike: (itemId: string, isLiked: boolean) => void;
  likedItemIds: Set<string>;
}

export interface FavoritesScreenProps {
  likedItems: Item[];
  onToggleLike: (itemId: string, isLiked: boolean) => void;
}
