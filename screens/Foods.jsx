import { SafeAreaView,Image, StyleSheet, Text, View,Keyboard, FlatList } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from "../components/TextInput";
import { COLORS, FONTS,ICONS,SIZES } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSelect from 'react-native-input-select';
import { actAddFood, actEditFood, actGetFoods, toggleTabName } from "../redux/slices/food/foodSlice";
import CustomeContent from "../components/CustomeContent";
import ModalWrapper from "../components/ModalWrapper"
import EmptyContent from "../components/CustomeContent";
import { isPureBase64, pickImage,convertImageToBase64 } from "../helpers";
import { toggleModalWrapper,setItemModalWrapper } from "../redux/slices/General/generalSlice";

const Foods = () => {
  const [isModalVisible,setModalVisible] = useState(false)
  const [foodDeleted,setFoodDelete] = useState(null)
  const [title,setTitle] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState(null)
  const [imageBase64,setImageBase64] = useState(null)
  const [titleRecipe,setTitleRecipe] = useState("")
  const [recipes,setRecipes] = useState([])
  

  
  const [editFood,setEditFood] = useState(null)  

  const dispatch = useDispatch()
  const { categories } = useSelector((state) => state.categories);
  const [category, setCategory] = useState(categories[0]?.id);
  const {tabName,foods} = useSelector((state) => state.foods)


  useEffect(()=>{
    if(!foods.length){
      dispatch(actGetFoods())
    }
  },[dispatch,foods.length])



  // Actions for the modal
  const switchToAddFood = () => {
    dispatch(toggleTabName("add"))
    clearForm()
  }


  const handleDeleteFood = (item) =>{
    dispatch(toggleModalWrapper(true))
    dispatch(setItemModalWrapper({ typeModal: "DELETE_FOOD", itemModal: item })) 
  }


  const handleEditFood = (food) => {
    setEditFood(food)
    setTitle(food.title)
    setPrice(String(food.price))
    setDescription(food.description)
    setImage(food.imageUrl)
    setRecipes(food.recepies)
    setCategory(food.categoryId)
    dispatch(toggleTabName("add"))
  } 


  const handleSaveEdit = () =>{
    if (!editFood) return;
    let imageBase64= null
    if (!isPureBase64(image)) {
      imageBase64 =convertImageToBase64(image)
    }
    const updatedFood = {
      categoryId: category,
      title,
      description,
      price: Number(price),
      imageBase64:image,
      recepies:recipes,
      imageBase64
    }
    dispatch(actEditFood(updatedFood))
    dispatch(toggleTabName("all"))
    clearForm()
  }

  const handleUploadImage = async () => {
    await pickImage({
      resizeWidth: 150,
      resizeHeight: 150,
      compression: 0.1,
      returnBase64: true,
      onImagePicked: ({ uri, base64 }) => {
        setImage(uri);
        setImageBase64(base64);
      },
    });
  }

  const handleAddFood = async () => {
    const response = await dispatch(actAddFood({ title, description, price: Number(price),categoryId: category,recepies:recipes, imageBase64 }))
    if(response.payload.message === "Food added successfully.") {
      await dispatch(toggleTabName("all"))
      clearForm();
    }
  }

  const clearForm = () =>{
    setEditFood(null)
    setCategory("")
    setTitle("")
    setPrice("")
    setDescription("")
    setImage(null)
    setImageBase64(null)
    setRecipes([])
    setTitleRecipe("")
  }


  const handleAddYourRecipe = () => {
    if (titleRecipe.trim() !== "") {
      setRecipes((prevRecipes) => [...prevRecipes, titleRecipe.trim()]);
      setTitleRecipe("");
      Keyboard.dismiss();
    }
  };

  const handleRemoveRecipe = (indexToRemove) => {
    setRecipes(prev => prev.filter((_, index) => index !== indexToRemove));
  };


  // Rendering the list of foods
  const renderFoodsList = () => {
    return (
      <>
      {
        foods && foods.length > 0 ? (
          <FlatList
            data={foods}
            keyExtractor={(item) => item.foodId}
            renderItem={({ item }) => 
              <CustomeContent
                item={item}
                isEnableChangeContent={true}
                isLastItem={false}
                isArticle={false}
                handleDelete={() => handleDeleteFood(item)}
                handleEditFood={()=> handleEditFood(item)}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        ) : <EmptyContent title={'Foods'} image={ICONS.NoFood} />
      }
      </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section_btns}>
          <Buttons
              title="Add"
              pressHandler={() => switchToAddFood()}
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
              {
                categories && categories.length > 0 && (
                  <DropdownSelect
                    placeholder="Select Category..."
                    options={categories.map(category => ({
                      label: category.nameCategory,
                      value: category?.categoryId,
                    }))}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    listComponentStyles={{
                      sectionHeaderStyle: {
                        padding: 10,
                        backgroundColor: 'green',
                        color: 'white',
                        width: '30%',
                      },
                    }}
                  />
                ) 
              }
              
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
                placeholder="Write your recipe..."
                value={titleRecipe}
                autoCapitalize="none"
                returnKeyType="next"
                onChangeText={setTitleRecipe}
                onSubmitEditing={handleAddYourRecipe}
                customWrapperInput={styles.wrapperInput}
              />

              <View>
                <FlatList
                  data={recipes}
                  horizontal
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item,index }) => (
                    <Buttons
                      title={item}
                      stylesText={styles.textButtonReceip}
                      stylesButton={[styles.btns_recipes]}
                      pressHandler={()=> handleRemoveRecipe(index)}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.recipeContainer}
                />
              </View>
              
              <View style={{marginVertical:10,flexDirection:"column",gap:10}}>
                <Buttons
                    title={"Pick an Image"}
                    pressHandler={handleUploadImage}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
              </View>
              
          
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

    <ModalWrapper 
          isModalVisible={isModalVisible}
          disableModalConfirm={()=> setModalVisible(false)}
          item={foodDeleted}
          typeModal={"DELETE_FOOD"}
          countItems={foods.length}
      />
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
    marginVertical:15
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
  },
  section_checkbox:{
    flexDirection: 'row',
    alignItems: 'center',
    gap:5
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    marginVertical: 15,
    marginHorizontal:2
  },
  item: {
    padding: 10,
    backgroundColor: COLORS.cardBg,
    borderRadius: 6,
    marginVertical: 4,
    fontSize: 16
  },
  recipeContainer: {
    gap: 10,
    marginTop: 10,
  },
  btns_recipes: {
    backgroundColor: COLORS.cardBg,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  textButtonReceip:{
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  }
});

export default Foods;
