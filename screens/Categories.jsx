import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from '../components/TextInput';
import { COLORS, FONTS, ICONS, SIZES } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddCategory, actGetCategories, actDeleteCategory, actEditCategory } from "../redux/slices/category/categorySlice";

const Categories = () => {
    const [category, setCategory] = useState("");
    const [editCategory,setEditCategory] = useState(null)
    const { loading, categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const haneleEditCategory = (category) => {
        setEditCategory(category)
        setCategory(category.name)
    };

    const handleSaveEdit = async () => {
        if (editCategory && category.trim()) {
          await dispatch(actEditCategory({ id: editCategory.id, name: category, }));
          setEditCategory(null);
          setCategory("");
        }
      };

    const handleDeleteCategory = async (idCategory) => {
        console.log("idCategory",idCategory)
        await dispatch(actDeleteCategory(idCategory));
    }

    useEffect(() => {
        dispatch(actGetCategories())
    }, [dispatch]);

    const handleAddCategory = useCallback(async () => {
        console.log("adding",category)
        if (category.trim() && category!=="") {
            await dispatch(actAddCategory({ name: category }));
            setCategory("");
        }
    },[category,dispatch])

    const renderCategory = ({ item }) => (
        <View key={item.id} style={styles.categoryWrapper}>
            <Text style={styles.category_name}>{item.name}</Text>
            <View style={styles.btns}>
                <Buttons
                    Icon={ICONS.EditIcon}
                    pressHandler={() => haneleEditCategory(item)}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
                <Buttons
                    Icon={ICONS.deleteIcon}
                    pressHandler={() => handleDeleteCategory(item.id)}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView>
            <Text style={styles.title}>Add New Category</Text>

            {/* Input and Button */}
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Category name"
                    value={category}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={(text) => setCategory(text)}
                    customInput={styles.input}
                />
                {
                editCategory ? (
                    <Buttons
                        Icon={ICONS.EditIcon}
                        pressHandler={handleSaveEdit}
                        stylesText={styles.textButton}
                        stylesButton={styles.button}
                    />
                ) : (
                    <Buttons
                        Icon={ICONS.AddIcon}
                        pressHandler={handleAddCategory}
                        stylesText={styles.textButton}
                        stylesButton={styles.button}
                    />
                    ) 
                }
                
            </View>

            {/* FlatList for Category List */}
            {loading === "loading" ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : categories.length > 0 ? (
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) =>  String(item.id) }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ overflow: "auto" }}
                />
            ) : (
                <View style={styles.noCategoriesContainer}>
                    <Text>No Categories Right Now!!!</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
    },
    categoryWrapper: {
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
        marginBottom: 20,
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    button: {
        backgroundColor: COLORS.white,
        padding: SIZES.small + 5,
        alignItems: "center",
        borderRadius: SIZES.medium,
    },
    textButton: {
        color: COLORS.white,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
    noCategoriesContainer: {
        alignItems: "center",
        marginTop: 20,
    },
});

export default Categories;
