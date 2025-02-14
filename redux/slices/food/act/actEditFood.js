import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const actEditFood = createAsyncThunk(
  "foods/actEditFood",
  async (foodData, { rejectWithValue }) => {
    try {
      const foods = collection(FIREBASE_DB, "foods");
      const docRef = await addDoc(foods, foodData);
      return { id: docRef.id, ...foodData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actEditFood;
