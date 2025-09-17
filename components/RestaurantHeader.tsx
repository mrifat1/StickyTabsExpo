import { RestaurantSection } from '@/types'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const RestaurantHeader: React.FC<RestaurantSection> = ({
    restaurantName,
    subtitle,
    rating,
    reviews
}) => {
  return (
    <View style={styles.headerOverlay}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.headerImage}
            />
              <View style={styles.headerContent}>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                <Text style={styles.restaurantTagline}>{subtitle}</Text>
                <View style={styles.headerInfo}>
                  <Text style={styles.headerInfoText}>{rating} (${reviews}+ reviews)</Text>
                </View>
              </View>
          </View>
  )
}
const styles = StyleSheet.create({
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
})
export default RestaurantHeader