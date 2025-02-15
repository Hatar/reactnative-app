import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from "../components/TextInput";
import { COLORS, FONTS,SIZES } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSelect from 'react-native-input-select';
import { actAddFood, actDeleteFood, actEditFood, actGetFoods, toggleTabName } from "../redux/slices/food/foodSlice";
import CustomeContent from "../components/CustomeContent";
import { FlatList } from "react-native-gesture-handler";

const Foods = () => {

  const [title,setTitle] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [imageUrl,setImageUrl] = useState("https://www.cnet.com/a/img/resize/69256d2623afcbaa911f08edc45fb2d3f6a8e172/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=675&width=1200")
  const [editFood,setEditFood] = useState(null)  

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categories);
  const [category, setCategory] = useState(categories[0].id);
  const {tabName,foods} = useSelector((state) => state.foods)


  useEffect(()=>{
    if(!foods.length){
      dispatch(actGetFoods())
    }
  },[dispatch,foods.length])

  const handleAddFood = () => {
    dispatch(actAddFood({categoryId:category,title,description,price,imageUrl}))
    dispatch(toggleTabName("all"))
    setCategory("")
    setTitle("")
    setPrice("")
    setDescription("")
  }


  const handleDeleteFood = (foodID) =>{
    dispatch(actDeleteFood(foodID))
  }


  const handleEditFood = (food) => {
    setEditFood(food)
    setTitle(food.title)
    setPrice(String(food.price))
    setDescription(food.description)
    setImageUrl(food.imageUrl)
    dispatch(toggleTabName("add"))
  } 


  const handleSaveEdit = () =>{
    if (!editFood) return;
    const updatedFood = {
      id: editFood.id,
      categoryId: category,
      title,
      description,
      price,
      imageUrl,
    }
    dispatch(actEditFood(updatedFood))
    dispatch(toggleTabName("all"))
    setEditFood(null)
    setCategory("")
    setTitle("")
    setPrice("")
    setDescription("")
  }

  const renderFoodsList = () => {
    return (
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => 
          <CustomeContent
            item={item}
            isEnableChangeContent={true}
            isLastItem={false}
            handleDelete={() => handleDeleteFood(item.id)}
            handleEditFood={()=> handleEditFood(item)}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section_btns}>
          <Buttons
              title="Add"
              pressHandler={() =>dispatch(toggleTabName("add"))}
              stylesText={styles.textButton}
              stylesButton={[styles.button,tabName === "add" && styles.activeButton,]}
          />
          <Buttons
              title="List Foods"
              pressHandler={() =>dispatch(toggleTabName("all"))}
              stylesText={styles.textButton}
              stylesButton={[styles.button,tabName === "all" && styles.activeButton,]}
          />
      </View>
      {
        tabName === "add" ? (
          <>
            <Text style={styles.title}> {editFood ? `Edit ${editFood.title}`  : "Add New Foods" } </Text>
            <View style={styles.inputWrapper}>
              <DropdownSelect
                placeholder="Select Category..."
                options={categories.map(category => ({
                  label: category.name,
                  value: category.id,
                }))}
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
              />
              <TextInput
                placeholder="Title"
                value={title}
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={(text) => setTitle(text)}
                customInput={styles.input}
                customWrapperInput={styles.wrapperInput}
              />
    
              <TextInput
                placeholder="Description"
                value={description}
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={(text) => setDescription(text)}
                customInput={styles.input}
                customWrapperInput={styles.wrapperInput}
              />
    
              <TextInput
                placeholder="Price"
                value={price}
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={(text) => setPrice(text)}
                customInput={styles.input}
                customWrapperInput={styles.wrapperInput}
              />
    
              <TextInput
                placeholder="Image"
                value={imageUrl}
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={(text) => setImageUrl(text)}
                customInput={styles.input}
                customWrapperInput={styles.wrapperInput}
              />

              <Buttons
                  title={editFood ? "Edit Food" :'Add Food'}
                  pressHandler={editFood ? handleSaveEdit :handleAddFood}
                  stylesText={styles.textButton}
                  stylesButton={styles.button}
              />
            </View>
          </>
        ) : (renderFoodsList())
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    marginHorizontal:20,
    flex:1
  },
  section_btns:{
    flexDirection:"row",
    justifyContent:"center",
    gap:10,
    marginBottom:15
  },
  inputWrapper: {
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  btns: {
    flexDirection: "row",
    gap: 5,
  },
  category_name: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.bg,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge + 5,
    color: COLORS.bg,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  wrapperInput:{
    width:'100%',
    marginVertical:2  
  },
  button: {
    backgroundColor: COLORS.bg,
    marginTop: SIZES.padding * 3,
    padding: SIZES.small + 4,
    alignItems: "center",
    borderRadius: SIZES.medium,
  },
  textButton: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
  },
  activeButton:{
    backgroundColor: COLORS.second
  },
  section_articles:{
    padding:18,
    marginHorizontal:0,
    marginBottom:15,
    borderRadius:0
  }
});

export default Foods;
