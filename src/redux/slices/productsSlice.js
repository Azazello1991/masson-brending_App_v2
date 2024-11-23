import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import examplePhoto from '../../images/example/example_1.webp'
import examplePhoto1 from '../../images/example/example_2.webp'
import examplePhoto2 from '../../images/example/example_3.webp'
import examplePhoto3 from '../../images/example/example_4.webp'
import examplePhoto4 from '../../images/example/example_5.webp'
// axios
import axios from "axios";

const initialState = {
  products: [],
  isLoading: "loadihg", // loadihg | success | error
  slidesExample: [
    {
      url: examplePhoto,
      id: "0",
    },
    {
      url: examplePhoto1,
      id: "1",
    },
    {
      url: examplePhoto2,
      id: "2",
    },
    {
      url: examplePhoto3,
      id: "3",
    },
    {
      url: examplePhoto4,
      id: "4",
    },
  ],
};

// fetch запит
export const fetchPizzasRes = createAsyncThunk(
  "pizza/fetchPizzaStatus",
  async (params) => {
   

    const { data } = await axios.get( // робимо запит
      `https://6633b2a9f7d50bbd9b4a6103.mockapi.io/items`
    );

    return data; // повертає масив товарів
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,

  reducers: {
    addId(state, action) {
      state.index = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPizzasRes.pending, (state) => {
        // Ожидание
        state.isLoading = "loadihg";
        state.items = [];
      })
      .addCase(fetchPizzasRes.fulfilled, (state, action) => {
        // Успешно
        state.pizzas = action.payload;
        state.isLoading = "success";
      })
      .addCase(fetchPizzasRes.rejected, (state) => {
        // Ошибка
        state.isLoading = "error";
        state.items = [];
      });
  },
});

export const selectCategory = (state) => state.categorys; // useSelector

export const { addId } = productsSlice.actions;

export default productsSlice.reducer;
