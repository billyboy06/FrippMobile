import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface HeaderProps {
  onNavigateToFavorites: () => void;
  onNavigateToProfile: () => void;
  currentView: 'swipe' | 'favorites';
}

const Header: React.FC<HeaderProps> = React.memo(({ 
  onNavigateToFavorites, 
  onNavigateToProfile, 
  currentView 
}) => {
  const { width } = useWindowDimensions();
  
  return (
    <View style={[styles.header, { width }]}>
      <TouchableOpacity 
        onPress={onNavigateToProfile} 
        style={[
          styles.iconButton,
          currentView === 'swipe' && styles.activeButton
        ]}
        activeOpacity={0.7}
        accessibilityLabel="Profile or swipe screen"
      >
        <Icon name="user" size={24} color="#9747FF" />
      </TouchableOpacity>
      
      <View style={styles.searchContainer}>
        <TextInput 
          placeholder="Rechercher..." 
          style={styles.searchInput}
          placeholderTextColor="#8C8A97"
        />
        <Icon name="search" size={20} color="#8C8A97" style={styles.searchIcon} />
      </View>
      
      <TouchableOpacity 
        onPress={onNavigateToFavorites} 
        style={[
          styles.iconButton,
          currentView === 'favorites' && styles.activeButton
        ]}
        activeOpacity={0.7}
        accessibilityLabel="Favorites"
      >
        <Icon name="heart" size={24} color="#9747FF" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    height: 64,
    zIndex: 30,
  },
  iconButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
  },
  activeButton: {
    shadowColor: '#9747FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 16,
    maxWidth: 300,
    position: 'relative',
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingRight: 40,
    fontSize: 14,
    color: '#2D2A35',
    backgroundColor: '#F8F7FC',
    borderRadius: 25,
    borderWidth: 0,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
});

export default Header;