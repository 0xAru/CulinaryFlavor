import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { useGetAllRecipesQuery, useGetCategoriesQuery, useGetRecipesByCategoryQuery } from '../features/api/apiSlice';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Récupération des données
  const { data: allRecipes, isLoading: isLoadingAllRecipes } = useGetAllRecipesQuery();
  const { data: allCategories } = useGetCategoriesQuery();
  const { data: recipesByCategory, isLoading: isLoadingByCategory } = useGetRecipesByCategoryQuery(selectedCategory, {
    skip: !selectedCategory, // Ne pas exécuter la requête si aucune catégorie n'est sélectionnée
  });

  // Calcul des recettes affichées en fonction de la catégorie
  let displayedRecipes = [];
  if (selectedCategory) {
    displayedRecipes = recipesByCategory || [];
  } else {
    displayedRecipes = allRecipes || [];
  }

  // Filtrage des recettes selon la recherche
  const filteredRecipes = searchValue
    ? displayedRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchValue.toLowerCase())
      )
    : displayedRecipes;

  // Gestion des clics sur les catégories
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchValue(''); // Réinitialiser la recherche
  };

  const handleAllCategories = () => {
    setSelectedCategory(null);
    setSearchValue(''); // Réinitialiser la recherche
  };

  return (
    <div>
      <div className="bg-gradient-to-t from-transparent to-amber-100 p-4">
        <div className="py-10 text-center">
          {/* Bouton pour afficher toutes les recettes */}
          <button
            onClick={handleAllCategories}
            className={`m-2 rounded-lg p-2 md:p-3 ${
              !selectedCategory ? 'bg-yellow-700' : 'bg-yellow-600'
            } text-white hover:bg-yellow-700 transition duration-200`}
          >
            Toutes les recettes
          </button>

          {/* Boutons pour chaque catégorie */}
          {allCategories?.map((category) => (
            <button
              key={category.idCategory}
              onClick={() => handleCategoryClick(category.strCategory)}
              className={`m-2 rounded-lg p-2 md:p-3 ${
                selectedCategory === category.strCategory ? 'bg-yellow-700' : 'bg-yellow-600'
              } text-white hover:bg-yellow-700 transition duration-200`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>

        {/* Barre de recherche */}
        <SearchBar value={searchValue} onChange={setSearchValue} />
      </div>

      {/* Affichage des recettes */}
      <div className="flex flex-wrap justify-center mt-1 min-h-96">
        {isLoadingAllRecipes || isLoadingByCategory ? (
          <p>Chargement des recettes...</p>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} />)
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Home;