import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            const { recipe, consumptionDate } = action.payload;
            const ingredients = [];
console.log(recipe);
            // Extraire les ingrédients de la recette
            for (let i = 1; i <= 20; i++) {
                const ingredientName = recipe[`strIngredient${i}`];
                const ingredientMeasure = recipe[`strMeasure${i}`];

                if (ingredientName && ingredientName.trim() !== "") {
                    ingredients.push({ name: ingredientName, measure: ingredientMeasure, consumptionDate });
                }
            }

            ingredients.forEach(ingredient => {
                const existingIngredient = state.value.find(i => i.name === ingredient.name);

                if (existingIngredient) {
                    // Remplacez la date si la nouvelle date est plus proche
                    if (new Date(consumptionDate) < new Date(existingIngredient.consumptionDate)) {
                        existingIngredient.consumptionDate = consumptionDate;
                    }
                } else {
                    state.value.push({
                        name: ingredient.name,
                        recipeName: recipe.strMeal,
                        measure: ingredient.measure,
                        consumptionDate
                    });
                }
            });
        },

        removeIngredient: (state, action) => {
            state.value = state.value.filter(ingredient => ingredient.name !== action.payload);
        },

        updateIngredient: (state, action) => {
            const { name, newMeasure, newConsumptionDate } = action.payload;
            const index = state.value.findIndex(ingredient => ingredient.name === name);

            if (index !== -1) {
                if (newMeasure !== undefined) {
                    state.value[index].measure = newMeasure;
                }
                if (newConsumptionDate !== undefined) {
                    state.value[index].consumptionDate = newConsumptionDate;
                }
            }
        }
    }
});

export const { addIngredient, updateIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
