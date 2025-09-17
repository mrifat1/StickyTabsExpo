export interface CategoryItem {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
  }
  
  export interface CategorySection {
    id: string;
    title: string;
    data: CategoryItem[];
  }

  export interface RestaurantSection {
    restaurantName: string;
    subtitle: string,
    rating: string,
    reviews: string,
    restaurantItems: CategorySection[]
  }
  
  export interface StickyTabsProps {
    sections: CategorySection[];
    renderHeader?: (item: RestaurantSection) => React.ReactNode;
    headerHeight?: number;
    tabHeight?: number;
    onItemPress?: (item: CategoryItem) => void;
  }
  
  export interface TabItem {
    id: string;
    title: string;
    index: number;
  }