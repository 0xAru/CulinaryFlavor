import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../features/ingredientsSlice"
import recipesSlice from '../features/recipesSlice';
import calendarSlice from '../features/calendarSlice';

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        recipes: recipesSlice,
        calendar: calendarSlice,
    }
})