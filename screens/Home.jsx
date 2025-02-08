import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { COLORS, SIZES } from '../constants';
import CustomeContent from '../components/CustomeContent';
import { FlatList } from 'react-native-gesture-handler';
import { FONTS } from '../constants/theme';
import { collection, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from '../firebase';

function Home({ route }) {
  const [data, setData] = useState([]);
  const categoryId = route?.params?.menuId
  useEffect(() => {
    if (!categoryId) return;
    setData([])
    const foodsCollection = collection(FIREBASE_DB, "foods");
    const unsubscribe = onSnapshot(foodsCollection, (snapshot) => {
      const filteredFoods = snapshot.docs
        .map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter(food => String(food.categoryId) === String(categoryId));
      setData(filteredFoods);
    });

    return () => {
      console.log("Cleaning up listener for category:", categoryId);
      unsubscribe();
    };
  }, [route.params?.menuId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{route?.params?.title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) =>
          <CustomeContent
            item={item}
            isEnableChangeContent={false}
            isLastItem={index === data.length - 1}
          />
        }
        numColumns={2} // Grid layout
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ overflow: "auto" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  contents: {
    marginVertical: 50
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    color: COLORS.bg,
    marginLeft: 10
  }
});

export default Home;
