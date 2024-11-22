import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/categories.php',
            transformResponse: (response) => response.categories,
        }),
        getRecipesByCategory: builder.query({
            query: (category) => `/filter.php?c=${category}`,
            transformResponse: (response) => response.meals || [],
        }),
        getRecipeById: builder.query({
            query: (id) => `/lookup.php?i=${id}`,
            transformResponse: (response) => response.meals ? response.meals[0] : null,
        }),
        getAllRecipes: builder.query({
            queryFn: async () => {
                try {
                    // Récupérer toutes les catégories
                    const categoriesResponse = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                    const categoriesData = await categoriesResponse.json();

                    // Créer un tableau de promesses pour récupérer les recettes de chaque catégorie
                    const categoryPromises = categoriesData.categories.map(async (category) => {
                        const mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
                        const mealsData = await mealsResponse.json();
                        return mealsData.meals || []; // Retourne les repas ou un tableau vide
                    });

                    // Attendre que toutes les promesses soient résolues
                    const mealsByCategory = await Promise.all(categoryPromises);

                    // Combiner tous les résultats en un seul tableau
                    return { data: mealsByCategory.flat() || [] }; // Aplatir le tableau
                } catch (error) {
                    return { error: error.message || 'Erreur lors de la récupération des recettes.' };
                }
            },
        }),
    }),
});

// Exporter les hooks générés
export const {
    useGetAllRecipesQuery,
    useGetCategoriesQuery,
    useGetRecipesByCategoryQuery,
    useGetRecipeByIdQuery,
} = apiSlice;
