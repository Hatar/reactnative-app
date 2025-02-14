import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_DB } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const actGetFoods = createAsyncThunk(
  "foods/actGetFoods",
  async (_, thunkAPI) => {
    try {
      const foodsColl = collection(FIREBASE_DB, "foods");
      const snapshot = await getDocs(foodsColl);
      const fodds = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return fodds;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default actGetFoods;
