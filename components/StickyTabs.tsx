import { restaurantDetails } from '@/data/mockData';
import { CategoryItem, CategorySection, StickyTabsProps } from '@/types';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const StickyTabs: React.FC<StickyTabsProps> = ({
  sections,
  renderHeader,
  headerHeight = 200,
  tabHeight = 50,
  onItemPress,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const mainScrollRef = useRef<ScrollView>(null);
  const tabScrollRef = useRef<ScrollView>(null);
  
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [sectionLayouts, setSectionLayouts] = useState<{ [key: string]: { y: number; height: number } }>({});

  const sectionRefs = useRef<{ [key: string]: View | null }>({});

  const handleSectionLayout = useCallback((sectionId: string, event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setSectionLayouts(prev => ({
      ...prev,
      [sectionId]: { y, height }
    }));
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const remainingHeaderHeight = Math.max(0, headerHeight - scrollPosition);
    const currentPosition = scrollPosition + tabHeight + remainingHeaderHeight;
    let newActiveIndex = 0;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const layout = sectionLayouts[section.id];
      
      if (layout && currentPosition >= layout.y - 100) {
        newActiveIndex = i;
      }
    }

    if (newActiveIndex !== activeTabIndex) {
      setActiveTabIndex(newActiveIndex);
      scrollTabToIndex(newActiveIndex);
    }
  }, [headerHeight, tabHeight, sections, sectionLayouts, activeTabIndex]);

  const scrollTabToIndex = useCallback((index: number) => {
    const tabWidth = 120;
    const scrollX = Math.max(0, (index * tabWidth) - (screenWidth / 2) + (tabWidth / 2));
    
    tabScrollRef.current?.scrollTo({
      x: scrollX,
      animated: true,
    });
  }, []);

  const handleTabPress = useCallback((index: number) => {
    const section = sections[index];
    const layout = sectionLayouts[section.id];
    
    if (layout && mainScrollRef.current) {
      const targetY = Math.max(0, layout.y - tabHeight);
      
      mainScrollRef.current.scrollTo({
        y: targetY,
        animated: true,
      });
      
      setActiveTabIndex(index);
      scrollTabToIndex(index);
    }
  }, [sections, sectionLayouts, tabHeight]);

  const renderTabBar = () => (
    <Animated.View
      style={[
        styles.tabContainer,
      ]}
    >
      <ScrollView
        ref={tabScrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabScrollContent}
      >
        {sections.map((section, index) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.tab,
              activeTabIndex === index && styles.activeTab
            ]}
            onPress={() => handleTabPress(index)}
          >
            <Text style={[
              styles.tabText,
              activeTabIndex === index && styles.activeTabText
            ]}>
              {section.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const renderItem = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onItemPress?.(item)}
    >
      <View style={styles.itemContent}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
          <Text style={styles.itemPrice}>BDT {item.price.toFixed(2)}</Text>
        </View>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.itemImage} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSection = (section: CategorySection, index: number) => (
    <View
      key={section.id}
      ref={(ref) => { sectionRefs.current[section.id] = ref; }}
      onLayout={(event) => handleSectionLayout(section.id, event)}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <FlatList
        data={section.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const animatedHeaderHeight = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={mainScrollRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { 
            useNativeDriver: false,
            listener: handleScroll,
          }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {renderHeader && (
          <Animated.View style={[styles.headerContainer, { height: animatedHeaderHeight }]}>
            {renderHeader(restaurantDetails)}
          </Animated.View>
        )}
        
        {renderTabBar()}
        
        <View style={styles.contentContainer}>
          {sections.map((section, index) => renderSection(section, index))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
  },
  tabContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
    paddingVertical: 10,
  },
  stickyTabContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
  },
  tabScrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    minWidth: 100,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default StickyTabs;

