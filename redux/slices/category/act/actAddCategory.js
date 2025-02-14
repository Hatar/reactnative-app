import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const actAddCategory = createAsyncThunk(
  "categories/actAddCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const categoriesColl = collection(FIREBASE_DB, "categories");
      const docRef = await addDoc(categoriesColl, categoryData);
      return { id: docRef.id, ...categoryData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actAddCategory;
