import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const actDeleteFood = createAsyncThunk(
  "foods/actDeleteFood",
  async (foodId, { rejectWithValue }) => {
    try {
      const categoryDocRef = doc(FIREBASE_DB, "foods", foodId)
      await deleteDoc(categoryDocRef)
      return { id: foodId }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export default actDeleteFood;
