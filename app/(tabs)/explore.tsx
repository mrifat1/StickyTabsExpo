import StickyTabs from '@/components/StickyTabs';
import { mockRestaurantData } from '@/data/mockData';
import { CategoryItem } from '@/types';
import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const handleItemPress = (item: CategoryItem) => {
    Alert.alert(
      'Item Selected',
      `${item.name}\n\nPrice: $${item.price.toFixed(2)}\n\n${item.description || 'No description available'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add to Cart', style: 'default' },
      ]
    );
  };

  const renderHeader = () => (
    
      <View style={styles.headerOverlay}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.headerImage}
        />
          <View style={styles.headerContent}>
            <Text style={styles.restaurantName}>Test restaurant</Text>
            <Text style={styles.restaurantTagline}>Authentic Foods</Text>
            <View style={styles.headerInfo}>
              <Text style={styles.headerInfoText}>4.8 (2,100+ reviews)</Text>
              <Text style={styles.headerInfoText}>25-35 min delivery</Text>
            </View>
          </View>
      </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StickyTabs
        sections={mockRestaurantData}
        renderHeader={renderHeader}
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