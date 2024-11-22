import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { removeEvent, updateEvent } from '../../../features/calendarSlice';
import { removeIngredient, updateIngredient } from "../../../features/ingredientsSlice";

const recipeListenerMiddleware = createListenerMiddleware()

recipeListenerMiddleware.startListening({
    matcher: isAnyOf(removeEvent, updateEvent),
    effect: (action, listenerApi) => {
        const eventId = action.payload.id;
        const state = listenerApi.getState();

        const recipe = state.recipes.value.find((recipe) => recipe.id === eventId);
        if (!recipe) {
            console.error("Recette introuvable pour l'ID :", eventId);
            return;
        }

        const recipeName = recipe.name;

        if (action.type === removeEvent.type) {

            const ingredientsToRemove = state.ingredients.value.filter(
                (ingredient) => ingredient.recipeName === recipeName
            );

            ingredientsToRemove.forEach(ingredient => {
                listenerApi.dispatch(removeIngredient(ingredient.name));
            });

        } else if (action.type === updateEvent.type) {
            const newDate = action.payload.start;

            const recipeIngredients = state.ingredients.value.filter(
                ing => ing.recipeName === recipeName
            );

            recipeIngredients.forEach(ingredient => {
                const updatePayload = {
                    name: ingredient.name,
                    recipeName: recipeName,
                    measure: ingredient.measure,
                    consumptionDate: newDate
                };

                listenerApi.dispatch(updateIngredient(updatePayload));
            })
        }
    }
})

export default recipeListenerMiddleware;