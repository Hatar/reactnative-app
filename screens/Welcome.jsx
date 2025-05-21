import { useRef, useState,useEffect } from "react";
import { Animated, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ICONS, SIZES, FONTS, COLORS } from "../constants";
import Buttons from "../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import SliderItem from "../components/SliderItem";
import PaginationSlider from "../components/PaginationSlider";
import { actGetCategories } from "../redux/slices/category/categorySlice";
import { actGetFoods } from "../redux/slices/food/foodSlice";
import { useDispatch } from "react-redux";

const Welcome = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const flatlistRef = useRef(null);
  const dispatch = useDispatch();
  const datas = [
    {
      id: 1,
      image: ICONS.logo,
      title: "Food in a Flash 1",
    },
    {
      id: 2,
      image: ICONS.logo,
      title: "Foods in a Flash 2",
    },
    {
      id: 3,
      image: ICONS.logo,
      title: "Food in a Flash 3",
    },
  ];

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handlePagination = () => {
    if (index < datas.length - 1) {
      flatlistRef.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    } else {
        navigation.navigate("Signin")
    }
  }


  useEffect(() => {
    dispatch(actGetCategories());
    dispatch(actGetFoods());
  }, [dispatch]);

  return (
    <SafeAreaView className="bg-bgLight flex-1 justify-center items-center relative">
      <FlatList
        ref={flatlistRef}
        data={datas}
        renderItem={({ item }) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <PaginationSlider data={datas} scrollX={scrollX} index={index} />

      <Buttons
        title={ index === 2 ? "Get Started" : "Next"}
        pressHandler={() => handlePagination()}
        stylesButton="w-56 h-14 bg-primary rounded-lg flex justify-center items-center"
        stylesText="text-2xl text-black font-normal tracking-tighter"
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.bg,
    padding: SIZES.small + 4,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
});
export default Welcome;
