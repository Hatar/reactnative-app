import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import Buttons from "../components/Buttons";
import TextInput from '../components/TextInput';
import { COLORS, FONTS, ICONS, SIZES } from "../constants";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actAddCategory, actGetCategories, actEditCategory } from "../redux/slices/category/categorySlice";
import ModalWrapper from "../components/ModalWrapper"
import EmptyContent from "../components/EmptyContent";
const Categories = () => {
    const [isModalVisible,setModalVisible] = useState(false)
    const [category, setCategory] = useState("");
    const [editCategory,setEditCategory] = useState(null)
    const [categoryDeleted,setCategoryDelete] = useState(null)
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


    const handleDeleteCategory = (item)=>{
        setCategoryDelete(item)
        setModalVisible(true)
    }

    useEffect(() => {
        dispatch(actGetCategories())
    }, [dispatch]);

    const handleAddCategory = useCallback(async () => {
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
                    pressHandler={() => handleDeleteCategory(item)}
                    stylesText={styles.textButton}
                    stylesButton={styles.button}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add New Category</Text>

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
            ) : 
                <EmptyContent title={"categories"} image={ICONS.NoFood} />
            }

            <ModalWrapper 
                isModalVisible={isModalVisible}
                disableModalConfirm={()=> setModalVisible(false)}
                item={categoryDeleted}
                typeModal={"DELETE_CATEGORY"}
                countItems={categories.length}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        marginVertical: 30,
        marginHorizontal:20,
        flex:1
    },
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
