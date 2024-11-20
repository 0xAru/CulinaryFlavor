import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {

        addPlannedRecipe: (state, action) => {
            const { recipeId, recipeName, date } = action.payload;

            const ingredients = [];

            // Extraire les ingrédients directement de la recette
            for (let i = 1; i <= 20; i++) {
                const ingredientName = action.payload[`strIngredient${i}`];
                const ingredientMeasure = action.payload[`strMeasure${i}`];

                if (ingredientName && ingredientName.trim() !== "") {
                    ingredients.push({ name: ingredientName, measure: ingredientMeasure });
                }
            }

            // Ajouter la recette avec ses ingrédients
            state.value.push({
                id: recipeId,
                name: recipeName,
                ingredients,
                date
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
                    ...action.payload };
            };
        }
    }
})

export const { addPlannedRecipe, removePlannedRecipe, updatePlannedRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;