import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiSlice } from '../../../features/api/apiSlice';
import { addIngredient } from '../../../features/ingredientsSlice';
import { addEvent } from '../../../features/calendarSlice';
import { addPlannedRecipe } from '../../../features/recipesSlice';

export const addRecipesThunk = createAsyncThunk('recipes/addRecipe', async ({ recipeId, date }, { dispatch, getState }) => {
    try {
        // Appel à l'API pour obtenir les détails de la recette (les hooks ne sont pas autorisés dans les thunks)
        const response = await dispatch(apiSlice.endpoints.getRecipeById.initiate(recipeId));

        // Vérifie si la réponse contient des données
        const recipeDetails = response.data;

        // Si aucun détail de recette n'est renvoyé, retourne une erreur
        if (!recipeDetails) {
            throw new Error('Recette non trouvée');
        }
        const ingredientsToAdd = [];

        // Extraire les ingrédients directement de la recette
        for (let i = 1; i <= 20; i++) {
            const ingredientName = recipeDetails[`strIngredient${i}`];
            const ingredientMeasure = recipeDetails[`strMeasure${i}`];

            if (ingredientName && ingredientName.trim() !== "") {
                // Ajout des ingrédients (ingredientsSlice)
                const ingredient = {
                    name: ingredientName,
                    measure: ingredientMeasure,
                    recipeName: recipeDetails.strMeal,
                    consumptionDate: date
                };

                // Vérifier si l'ingrédient existe déjà dans l'état
                const existingIngredient = getState().ingredients.value.find(i => i.name === ingredient.name);

                if (existingIngredient) {
                    // Remplacez la date si la nouvelle date est plus proche
                    if (new Date(date) < new Date(existingIngredient.consumptionDate)) {
                        // Mettre à jour la date de consommation
                        existingIngredient.consumptionDate = date;
                    }
                } else {
                    // Ajouter l'ingrédient au tableau d'ingrédients
                    ingredientsToAdd.push(ingredient);
                }
            }
        }

        // Dispatch de l'action addIngredient pour chaque nouvel ingrédient
        ingredientsToAdd.forEach(ingredient => {
            dispatch(addIngredient({ ingredient }));
        });

        // Ajout de l'événement dans le calendrier (calendarSlice)
        dispatch(addEvent({
            id: recipeDetails.idMeal,
            title: recipeDetails.strMeal,
            start: date,
            allDay: true,
        }));

        // Ajout de la recette planifiée (recipesSlice)
        dispatch(addPlannedRecipe({
            recipeId: recipeDetails.idMeal,
            recipeName: recipeDetails.strMeal,
            date,
            ingredients: ingredientsToAdd
        }));
        
    } catch (error) {
        console.error("Erreur lors de l'ajout de la recette :", error);
    }
}
);