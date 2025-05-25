import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryIcon = ({ title, isActive }) => {
  const getIconByTitle = (title) => {
    const lowerTitle = title?.toLowerCase() || '';
    
    switch (lowerTitle) {
      case 'pizza':
        return 'pizza';
      case 'burger':
        return 'fast-food';
      case 'meal':
        return 'restaurant';
      case 'combo':
      case 'combos':
        return 'restaurant-outline';
      case 'drinks':
        return 'beer';
      case 'dessert':
        return 'ice-cream';
      case 'salad':
        return 'leaf';
      case 'breakfast':
        return 'cafe';
      case 'lunch':
        return 'restaurant-outline';
      case 'dinner':
        return 'moon';
      default:
        return 'restaurant'; // Default icon
    }
  };

  return (
    <View className={`w-12 h-12 rounded-full ${isActive ? 'bg-white/20' : 'bg-primary/20'} justify-center items-center`}>
      <Ionicons
        name={getIconByTitle(title)}
        size={24}
        color={isActive ? '#ffffff' : '#f9c32d'}
      />
    </View>
  );
};

export default CategoryIcon; 