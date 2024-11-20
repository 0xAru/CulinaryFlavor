import { useState, useEffect } from 'react';
import { getCategories, getRecipesByCategory } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  // États pour stocker les données
  const [categories, setCategories] = useState([]);
  const [categoryRecipes, setCategoryRecipes] = useState({});
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const loadCategoriesAndRecipes = async () => {
      try {
        const allCategories = await getCategories();
        setCategories(allCategories);

        const allRecipes = allCategories.map(category => 
          getRecipesByCategory(category.strCategory)
        );
        const recipesResults = await Promise.all(allRecipes);

        // Organisation des recettes par catégorie
        const recipesMap = allCategories.reduce((acc, category, index) => {
          acc[category.strCategory] = recipesResults[index];
          return acc;
        }, {});

        setCategoryRecipes(recipesMap);
        setRecipesToDisplay(Object.values(recipesMap).flat());

      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    loadCategoriesAndRecipes();
  }, []);

  const handleSearch = async (search) => {
    setSearchValue(search);
    
    // Sélection des recettes à filtrer (catégorie spécifique ou toutes)
    let recipesToFilter = selectedCategory ? categoryRecipes[selectedCategory] : Object.values(categoryRecipes).flat();

    if (search) {
      const filtered = recipesToFilter.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(search.toLowerCase())
      );
      setRecipesToDisplay(filtered);
    } else {
      setRecipesToDisplay(Object.values(categoryRecipes).flat());
    }
  };

  // Gestion du clic sur une catégorie particulière
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setRecipesToDisplay(categoryRecipes[category] || []);
    setSearchValue('');
  };

  // Gestion du clic sur "Toutes les recettes"
  const handleAllCategories = () => {
    setSelectedCategory(null);
    setRecipesToDisplay(Object.values(categoryRecipes).flat());
    setSearchValue('');
  };

  return (
    <div>
      <div className="bg-gradient-to-t from-transparent to-amber-100 p-4">
        <div className="py-10 text-center">
            <button
              onClick={handleAllCategories}
              className="m-2 rounded-lg p-2 md:p-3 bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
            >
              Toutes les recettes
            </button>
            {categories.map(category => (
            <button
              key={category.idCategory}
              onClick={() => handleCategoryClick(category.strCategory)}
              className={`m-2 rounded-lg p-2 md:p-3 ${
                selectedCategory === category.strCategory 
                  ? 'bg-yellow-700' 
                  : 'bg-yellow-600'
              } text-white hover:bg-yellow-700 transition duration-200`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
        <SearchBar onSearch={handleSearch} value={searchValue} onChange={setSearchValue} />
      </div>
      <div className="flex flex-wrap justify-center mt-1 min-h-96">
        {recipesToDisplay.length > 0 ? (
          recipesToDisplay.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </div>
    </div>
  );
}

export default Home;