import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../features/ingredientsSlice"
import recipesSlice from '../features/recipesSlice';
import calendarSlice from '../features/calendarSlice';
import recipeListenerMiddleware from './middlewares/listeners/recipeListenerMiddleware';
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        ingredients: ingredientsSlice,
        recipes: recipesSlice,
        calendar: calendarSlice,
        [apiSlice.reducerPath] : apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(recipeListenerMiddleware.middleware).concat(apiSlice.middleware)
});