import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addPlannedRecipe: (state, action) => {
            const { recipeId, recipeName, date, ingredients } = action.payload;

            state.value.push({
                id: recipeId,
                name: recipeName,
                ingredients,
                date,
            });
        },

        removePlannedRecipe: (state, action) => {
            return {
                ...state,
                value: state.value.filter(recipe => recipe.id !== action.payload)
            }
        },

        updatePlannedRecipe: (state, action) => {
            const index = state.value.findIndex(recipe => recipe.id === action.payload.id);

            if (index !== -1) {
                state.value[index] = {
                    ...state.value[index],
                    ...action.payload
                };
            };
        }
    }
})

export const { addPlannedRecipe, removePlannedRecipe, updatePlannedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;