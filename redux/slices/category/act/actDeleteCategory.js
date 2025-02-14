import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const categoryDocRef = doc(FIREBASE_DB, "categories", categoryId)
      await deleteDoc(categoryDocRef)
      return { id: categoryId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteCategory;
