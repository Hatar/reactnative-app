import {
  SafeAreaView,
  Image,
  Text,
  View,
  Keyboard,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import Buttons from "../components/Buttons";
import TextInput from "../components/TextInput";
import { COLORS, FONTS, ICONS, SIZES } from "../constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSelect from "react-native-input-select";
import {
  actAddFood,
  actEditFood,
  actGetFoods,
  toggleTabName,
} from "../redux/slices/food/foodSlice";
import CustomeContent from "../components/CustomeContent";
import ModalWrapper from "../components/ModalWrapper";
import EmptyContent from "../components/CustomeContent";
import { isPureBase64, pickImage, convertImageToBase64 } from "../helpers";
import {
  toggleModalWrapper,
  setItemModalWrapper,
} from "../redux/slices/General/generalSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { actGetCategories } from "../redux/slices/category/categorySlice";

const Foods = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [foodDeleted, setFoodDelete] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [titleRecipe, setTitleRecipe] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [editFood, setEditFood] = useState(null);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [category, setCategory] = useState(categories[0]?.id);
  const { tabName, foods } = useSelector((state) => state.foods);

  useEffect(() => {
    if (!foods.length) {
      dispatch(actGetFoods());
    }
    dispatch(actGetCategories())

  }, [dispatch, foods.length]);

  // Actions for the modal
  const switchToAddFood = () => {
    dispatch(toggleTabName("add"));
    clearForm();
  };

  const handleDeleteFood = (item) => {
    dispatch(toggleModalWrapper(true));
    dispatch(
      setItemModalWrapper({ typeModal: "DELETE_FOOD", itemModal: item })
    );
  };

  const handleEditFood = (food) => {
    setEditFood(food);
    setTitle(food.title);
    setPrice(String(food.price));
    setDescription(food.description);
    setImage(food.imageUrl);
    setRecipes(food.recepies);
    setCategory(food.categoryId);
    dispatch(toggleTabName("add"));
  };

  // Helper to strip data URI prefix if present
  function getRawBase64(base64) {
    if (!base64) return base64;
    // Remove data URI prefix if present
    const match = base64.match(/^data:(.*);base64,(.*)$/);
    return match ? match[2] : base64;
  }

  const handleSaveEdit = async () => {
    if (!editFood) return;
    try {
      let base64ToSend = imageBase64;
      if (!base64ToSend && image && !isPureBase64(image)) {
        base64ToSend = await convertImageToBase64(image);
      }
      base64ToSend = getRawBase64(base64ToSend);
      const updatedFood = {
        categoryId: category,
        title,
        description,
        price: Number(price),
        imageBase64: base64ToSend,
        recepies: recipes,
      };
      const response = await dispatch(actEditFood(updatedFood));
      if (response?.payload?.message?.toLowerCase().includes('success')) {
        Alert.alert('Success', 'Food updated successfully!');
        await dispatch(actGetCategories())
        await ispatch(toggleTabName("all"));
        clearForm();
      } else {
        Alert.alert('Error', response?.payload?.message || 'Failed to update food.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while updating food.');
    }
  };

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
  };

  const handleAddFood = async () => {
    try {
      let base64ToSend = imageBase64;
      if (!base64ToSend && image && !isPureBase64(image)) {
        base64ToSend = await convertImageToBase64(image);
      }
      base64ToSend = getRawBase64(base64ToSend);
      const response = await dispatch(
        actAddFood({
          title,
          description,
          price: Number(price),
          categoryId: category,
          recepies: recipes,
          imageBase64: base64ToSend,
        })
      );
      if (response?.payload?.message?.toLowerCase().includes('success')) {
        Alert.alert('Success', 'Food added successfully!');
        await dispatch(actGetCategories())
        await dispatch(toggleTabName("all"));
        clearForm();
      } else {
        Alert.alert('Error', response?.payload?.message || 'Failed to add food.');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while adding food.');
    }
  };

  const clearForm = () => {
    setEditFood(null);
    setCategory("");
    setTitle("");
    setPrice("");
    setDescription("");
    setImage(null);
    setImageBase64(null);
    setRecipes([]);
    setTitleRecipe("");
  };

  const handleAddYourRecipe = () => {
    if (titleRecipe.trim() !== "") {
      setRecipes((prevRecipes) => [...prevRecipes, titleRecipe.trim()]);
      setTitleRecipe("");
      Keyboard.dismiss();
    }
  };

  const handleRemoveRecipe = (indexToRemove) => {
    setRecipes((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Rendering the list of foods
  const renderFoodsList = () => {
    return (
      <>
        {foods && foods.length > 0 ? (
          <FlatList
            data={foods}
            keyExtractor={(item) => item.foodId}
            renderItem={({ item }) => (
              <CustomeContent
                item={item}
                isEnableChangeContent={true}
                isLastItem={false}
                isArticle={false}
                handleDelete={() => handleDeleteFood(item)}
                handleEditFood={() => handleEditFood(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyContent title={"Foods"} image={ICONS.NoFood} />
        )}
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-bgLight">
      <View className="flex-row justify-center gap-4 mt-4 mb-6">
        <Buttons
          title="Add"
          pressHandler={() => switchToAddFood()}
          stylesButton="bg-primary px-6 py-3 rounded-lg shadow-2xl border-2 border-primary/60"
          stylesText="text-lg font-bold text-black"
        />
        <Buttons
          title="List Foods"
          pressHandler={() => dispatch(toggleTabName("all"))}
          stylesButton="bg-white px-6 py-3 rounded-lg border-2 border-primary/60 shadow-2xl"
          stylesText="text-lg font-bold text-primary"
        />
      </View>
      {tabName === "add" ? (
        <View className="mt-10 px-2 flex-1">
          <Text className="text-2xl font-extrabold text-darkText mb-8 text-center tracking-wide">
            {" "}
            {editFood ? `Edit ${editFood.title}` : "Add New Foods"}{" "}
          </Text>
      
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              {categories && categories.length > 0 && (
                <View className="mb-4 mx-2 border-2 border-primary/30 rounded-xl px-4">
                  <DropdownSelect
                    placeholder="Select Category..."
                    placeholderStyle={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 18
                    }}
                    iconStyle={{
                      marginRight: 10,
                      alignSelf: 'center'
                    }}
                    options={categories.map((category) => ({
                      label: category.nameCategory,
                      value: category?.categoryId,
                    }))}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    selectedItemStyle={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 18
                    }}
                    containerStyle={{
                      textAlign: 'center',
                      alignSelf: 'center',
                      marginTop: 18
                    }}
                  />
                </View>
              )}

              <View className="mx-2">
                <TextInput
                  placeholder="Enter food title..."
                  value={title}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={(text) => setTitle(text)}
                  className={`px-4 py-5 text-gray-800 border-2 ${title?.length > 0 ? 'border-primary/60' : 'border-primary/30'} rounded-xl focus:border-primary/60`}
                />

                <TextInput
                  placeholder="Enter food description..."
                  value={description}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={(text) => setDescription(text)}
                  className={`px-4 py-5 text-gray-800 border-2 ${description?.length > 0 ? 'border-primary/60' : 'border-primary/30'} rounded-xl focus:border-primary/60`}
                />

                <TextInput
                  placeholder="Enter food price..."
                  value={price}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={(text) => setPrice(text)}
                  keyboardType="numeric"
                  className={`px-4 py-5 text-gray-800 border-2 ${price?.length > 0 ? 'border-primary/60' : 'border-primary/30'} rounded-xl focus:border-primary/60`}
                />

                <TextInput
                  placeholder="Write your recipe here..."
                  value={titleRecipe}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={setTitleRecipe}
                  onSubmitEditing={handleAddYourRecipe}
                  className={`px-4 py-5 text-gray-800 border-2 ${titleRecipe?.length > 0 ? 'border-primary/60' : 'border-primary/30'} rounded-xl focus:border-primary/60`}
                />

                <View className="mb-4">
                  <FlatList
                    data={recipes}
                    horizontal
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <Buttons
                        title={item}
                        pressHandler={() => handleRemoveRecipe(index)}
                        stylesButton="bg-primary/10 px-5 py-3 rounded-full border-2 border-primary/30 mr-3"
                        stylesText="text-primary font-semibold"
                        Icon={
                          <Ionicons
                            name="close-circle"
                            size={20}
                          />
                        }
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>

                <View className="space-y-4">
                  <Buttons
                    title="Pick an Image"
                    pressHandler={handleUploadImage}
                    stylesButton="bg-primary/10 px-7 py-5 rounded-xl border-2 border-primary/30 flex-row items-center justify-center space-x-3"
                    stylesText="text-primary font-bold text-lg ml-2"
                    Icon={
                      <Ionicons
                        name="cloud-upload-outline"
                        size={26}
                        color={COLORS.primary}
                      />
                    }
                  />

                  {image && (
                    <Image
                      source={{ uri: image }}
                      className="w-36 h-36 rounded-2xl self-center border-3 border-primary/30 mt-4"
                    />
                  )}
                </View>

                <Buttons
                  title={editFood ? "Update Food" : "Add Food"}
                  pressHandler={editFood ? handleSaveEdit : handleAddFood}
                  stylesButton="bg-primary/10 px-7 py-5 rounded-xl border-2 border-primary/30 flex-row items-center justify-center space-x-3 mt-4"
                  stylesText="text-primary font-bold text-lg ml-2"
                  Icon={
                    <Ionicons
                      name={editFood ? "checkmark-circle" : "add-circle"}
                      size={26}
                      color={COLORS.primary}
                    />
                  }
                />
              </View>
            </ScrollView>
          </View>
      ) : (
        renderFoodsList()
      )}
      <ModalWrapper
        isModalVisible={isModalVisible}
        disableModalConfirm={() => setModalVisible(false)}
        item={foodDeleted}
        typeModal={"DELETE_FOOD"}
        countItems={foods.length}
      />
    </SafeAreaView>
  );
};

export default Foods;
