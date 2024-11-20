/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import Modal from './RecipeModal';

const RecipeCard = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullRecipe, setFullRecipe] = useState(null);
  const maxTitleLength = 20;


  const truncateTitle = (title) => {
    if (title.length > maxTitleLength) {
      return title.substring(0, maxTitleLength) + '...';
    }
    return title;
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    if (!fullRecipe) {
      const recipeDetails = await getRecipeById(recipe.idMeal);
      setFullRecipe(recipeDetails);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="border border-orange-800 rounded-lg bg-gray-100 p-4 m-2 w-80 h-80 relative">
      <Link to={`/recipe/${recipe.idMeal}`}>
        <h3 className="text-lg font-bold mb-2">{truncateTitle(recipe.strMeal)}</h3>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover rounded" />
      </Link>
      <button
        onClick={handleOpenModal}
        className="absolute bottom-4 right-4 border border-orange-800 text-2xl text-orange-800 rounded-full w-10 h-10 flex justify-center">
        +
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={fullRecipe}/>
    </div>
  );
};

export default RecipeCard;
