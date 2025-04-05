import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from '../components/TextInput';
import { COLORS, FONTS, ICONS, SIZES } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddCategory, actGetCategories, actEditCategory } from "../redux/slices/category/categorySlice";
import EmptyContent from "../components/EmptyContent";
import {toggleDisplayModal } from "../redux/slices/General/generalSlice";
const Categories = () => {
    const [category, setCategory] = useState("");
    const [editCategory,setEditCategory] = useState(null)
    const { loading, categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const haneleEditCategory = (category) => {
        setEditCategory(category)
        setCategory(category.nameCategory)
    };

    const handleSaveEdit = async () => {
        if (editCategory && category.trim()) {
          await dispatch(actEditCategory({ id: editCategory.categoryId, nameCategory: category, }));
          setEditCategory(null);
          setCategory("");
        }
    };


    const handleDeleteCategory = (item)=>{
        dispatch(toggleDisplayModal({ typeModal: "DELETE_CATEGORY", itemModal: item }))  
    }

    useEffect(() => {
        dispatch(actGetCategories())
    }, [dispatch]);

    const handleAddCategory = useCallback(async () => {
        if (category.trim() && category!=="") {
            await dispatch(actAddCategory({ nameCategory: category }));
            await dispatch(actGetCategories())
            setCategory("");
        }
    },[category,dispatch])


    const handleCancel = () =>{
        setEditCategory(null)
        setCategory("")
    }

    const renderCategory = ({ item }) => (
        <View key={item.categoryId} style={styles.categoryWrapper}>
            <Text style={styles.category_name}>{item.nameCategory}</Text>
            <View style={styles.btns}>
                <Buttons
                    Icon={ICONS.EditIcon}
                    pressHandler={() => haneleEditCategory(item)}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
                <Buttons
                    Icon={ICONS.deleteIcon}
                    pressHandler={() => handleDeleteCategory(item)}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{editCategory ? `Edit ${editCategory.nameCategory}` : "Add New Category"} </Text>

            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Category name"
                    value={category}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={(text) => setCategory(text)}
                    customInput={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Buttons
                        Icon={ICONS.closeIcon}
                        title={"Cancel"}
                        pressHandler={handleCancel}
                        stylesText={styles.cancelTextButton}
                        stylesButton={styles.button}
                    />
                    {
                    editCategory ? (
                        <Buttons
                            Icon={ICONS.EditIcon}
                            title={"Edit"}
                            pressHandler={handleSaveEdit}
                            stylesText={styles.textButton}
                            stylesButton={styles.button}
                        />
                    ) : (
                        <Buttons
                            title={"Add"}
                            Icon={ICONS.AddIcon}
                            pressHandler={handleAddCategory}
                            stylesText={styles.textButton}
                            stylesButton={styles.button}
                        />
                        ) 
                    }
                </View>
                
            </View>

            {loading === "loading" ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : categories.length > 0 ? (
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) =>  String(item.categoryId) }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ overflow: "auto" }}
                />
            ) : 
                <EmptyContent title={"categories"} image={ICONS.NoFood} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        marginVertical: 30,
        marginHorizontal:15,
        flex:1
    },
    inputWrapper: {
        marginBottom: 20,
        width: "100%"
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
        color: COLORS.cardBg,
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.large,
    },
    noCategoriesContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        gap: 10,
    },
    cancelTextButton: {
        color: COLORS.cardBg,
        fontSize: SIZES.medium,
        fontWeight: "bold",
    },
});

export default Categories;
