import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            const { ingredient } = action.payload;

            state.value.push({
                name: ingredient.name,
                recipeName: ingredient.recipeName,
                measure: ingredient.measure,
                consumptionDate: ingredient.consumptionDate
            });
        },

        removeIngredient: (state, action) => {
            state.value = state.value.filter(ingredient => ingredient.name !== action.payload);
        },

        updateIngredient: (state, action) => {
            const { name, measure, consumptionDate } = action.payload;
            const index = state.value.findIndex(ingredient => ingredient.name === name);

            if (index !== -1) {
                if (measure !== undefined) {
                    state.value[index].measure = measure;
                }
                if (consumptionDate !== undefined) {
                    state.value[index].consumptionDate = consumptionDate;
                }
            }
        }
    }
});

export const { addIngredient, updateIngredient, removeIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
