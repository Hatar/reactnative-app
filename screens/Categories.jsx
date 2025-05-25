import { SafeAreaView, Text, View, FlatList, ActivityIndicator } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from '../components/TextInput';
import { COLORS, ICONS } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddCategory, actGetCategories, actEditCategory } from "../redux/slices/category/categorySlice";
import EmptyContent from "../components/EmptyContent";
import { setItemModalWrapper, toggleModalWrapper } from "../redux/slices/General/generalSlice";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Categories = () => {
    const [category, setCategory] = useState("");
    const [editCategory, setEditCategory] = useState(null);
    const { loading, categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const haneleEditCategory = (category) => {
        setEditCategory(category);
        setCategory(category.nameCategory);
    };

    const handleSaveEdit = async () => {
        if (editCategory && category.trim()) {
            await dispatch(actEditCategory({ id: editCategory.categoryId, nameCategory: category }));
            setEditCategory(null);
            setCategory("");
        }
    };

    const handleDeleteCategory = (item) => {
        dispatch(toggleModalWrapper(true));
        dispatch(setItemModalWrapper({ typeModal: "DELETE_CATEGORY", itemModal: item }));
    };

    useEffect(() => {
        dispatch(actGetCategories());
    }, [dispatch]);

    const handleAddCategory = useCallback(async () => {
        if (category.trim() && category !== "") {
            await dispatch(actAddCategory({ nameCategory: category }));
            await dispatch(actGetCategories());
            setCategory("");
        }
    }, [category, dispatch]);

    const handleCancel = () => {
        setEditCategory(null);
        setCategory("");
    };

    return (
        <SafeAreaView className="flex-1 bg-bgLight ">
            <View className="px-4">
                <Text className="text-2xl font-extrabold text-darkText mb-8 text-center tracking-wide mt-10">
                    {editCategory ? `Edit ${editCategory.nameCategory}` : "Add New Category"}
                </Text>
                <View className="w-full bg-white rounded-2xl border border-primary/20 p-6 mb-8">
                    <TextInput
                        placeholder="Category name"
                        value={category}
                        autoCapitalize="none"
                        returnKeyType="next"
                        onChangeText={(text) => setCategory(text)}
                        className="px-4 py-5 text-gray-800 border-2 border-primary/30 rounded-xl focus:border-primary/60 mb-4"
                    />
                    <View className="flex-row justify-center items-center gap-4 mt-2">
                        <Buttons
                            Icon={<Ionicons name={"close-circle-outline"} size={24} color="#888" />}
                            title={"Cancel"}
                            pressHandler={handleCancel}
                            stylesButton="bg-gray-100 px-6 py-3 rounded-lg border border-gray-200"
                            stylesText="text-base font-bold text-gray-700"
                        />
                        {editCategory ? (
                            <Buttons
                                Icon={<Ionicons name={"pencil-outline"} size={24} color={COLORS.primary} />}
                                title={"Edit"}
                                pressHandler={handleSaveEdit}
                                stylesButton="bg-primary px-6 py-3 rounded-lg"
                                stylesText="text-base font-bold text-white"
                            />
                        ) : (
                            <Buttons
                                title={"Add"}
                                Icon={<Ionicons name={"add-circle-outline"} size={24} color="#fff" />}
                                pressHandler={handleAddCategory}
                                stylesButton="bg-primary px-6 py-3 rounded-lg flex-row items-center gap-2"
                                stylesText="text-base font-bold text-white"
                            />
                        )}
                    </View>
                </View>
            </View>
            <View className="flex-1 px-4 pb-4">
                {loading === "loading" ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : categories.length > 0 ? (
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            <View key={item.categoryId} className="flex-row justify-between items-center bg-white rounded-xl  p-4 mb-4 border border-primary/20">
                                <Text className="font-bold text-lg text-darkText flex-1 pr-2">{item.nameCategory}</Text>
                                <View className="flex-row gap-2">
                                    <Buttons
                                        Icon={<Ionicons name={"pencil-outline"} size={20} color={COLORS.primary} />}
                                        pressHandler={() => haneleEditCategory(item)}
                                        stylesButton="bg-primary/10 p-2 rounded-full"
                                    />
                                    <Buttons
                                        Icon={<Ionicons name={"trash-outline"} size={20} color="#ef4444" />}
                                        pressHandler={() => handleDeleteCategory(item)}
                                        stylesButton="bg-red-100 p-2 rounded-full"
                                    />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => String(item.categoryId)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    />
                ) : (
                    <EmptyContent title={"categories"} image={ICONS.NoFood} />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Categories;
