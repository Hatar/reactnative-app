import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    try {
      const categoriesColl = collection(FIREBASE_DB, "categories");
      const snapshot = await getDocs(categoriesColl);
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default actGetCategories;
