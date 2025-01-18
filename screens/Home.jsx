import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { COLORS,SIZES } from '../constants'
import CustomeContent from '../components/CustomeContent';
import { FlatList } from 'react-native-gesture-handler';
import { DATA_COMBOS, DATA_MEALS, FONTS } from '../constants/theme';
function Home({route}) {

  const [contentTitle, setContentTitle] = useState(route.params?.title || 'Meals');
  const [data,setData] = useState([])

  useEffect(() => {
    // Update the title if route.params changes
    if (route.params?.title) {
      setContentTitle(route.params.title);
    }
    if(contentTitle === 'Meals') {
      setData(DATA_MEALS)
    } else if (contentTitle === 'Combos') {
      setData(DATA_COMBOS)
    }
  }, [route.params,data]);
  return (
    <SafeAreaView style={styles.container}>
          <Text style={styles.title}>{contentTitle}</Text>
          <FlatList 
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item,index }) => 
                <CustomeContent 
                  item={item} 
                  isEnableChangeContent={false}
                  isLastItem={index === data.length - 1} 
                />
              }
              numColumns={2} // Grid layout
          />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  contents:{
    marginVertical:50
  },
  title:{
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    color: COLORS.bg,
    marginLeft:10
  }
})

export default Home