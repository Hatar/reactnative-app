import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const actAddFood = createAsyncThunk(
  "foods/actAddFood",
  async (foodData, { rejectWithValue }) => {
    try {
      const categoriesColl = collection(FIREBASE_DB, "foods");
      const docRef = await addDoc(categoriesColl, foodData);
      return { id: docRef.id, ...foodData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actAddFood;
