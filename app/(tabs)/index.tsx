import RestaurantHeader from '@/components/RestaurantHeader';
import StickyTabs from '@/components/StickyTabs';
import { mockRestaurantData } from '@/data/mockData';
import { CategoryItem } from '@/types';
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const handleItemPress = (item: CategoryItem) => {
    Alert.alert(
      'Item Selected',
      `${item.name}\n\nPrice: BDT${item.price.toFixed(2)}\n\n${item.description || 'No description available'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add to Cart', style: 'default' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StickyTabs
        sections={mockRestaurantData}
        renderHeader={(item) => <RestaurantHeader {...item}/>}
        headerHeight={250}
        tabHeight={60}
        onItemPress={handleItemPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerOverlay: {
    flex: 1,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  headerContent: {
    padding: 20,
    paddingTop: 60,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    // textShadowColor: 'rgba(0,0,0,0.5)',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 3,
  },
  restaurantTagline: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  headerInfo: {
    gap: 4,
  },
  headerInfoText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});