/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../features/api/apiSlice';
import Modal from './Modal';
import { addRecipesThunk } from '../app/middlewares/thunks/addRecipesThunk';

const RecipeCard = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const maxTitleLength = 20;
  const dispatch = useDispatch();

  const { data: recipeDetails, isLoading } = useGetRecipeByIdQuery(recipe.idMeal, {
    skip: !isModalOpen, // Ne pas récupérer la recette si le modal n'est pas ouvert
  });

  const truncateTitle = (title) => {
    if (title.length > maxTitleLength) {
      return title.substring(0, maxTitleLength) + '...';
    }
    return title;
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmAdd = () => {
    if (selectedDate) {
      // Dispatch du thunk avec l'ID de la recette et la date sélectionnée
      dispatch(addRecipesThunk({ recipeId: recipe.idMeal, date: selectedDate }));
      setIsModalOpen(false);
      setSelectedDate('');
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
        title="Ajouter au planning"
        onConfirm={handleConfirmAdd}
        confirmText="Ajouter"
      >
        {isLoading ? (
          <p>Chargement...</p>
        ) : recipeDetails ? (
          <>
            <p className="mb-3">
              Ajouter <span className="text-orange-800 font-semibold">{recipeDetails.strMeal}</span> au menu du :
            </p>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
          </>
        ) : (
          <p>Recette non trouvée.</p>
        )}
      </Modal>
    </div>
  );
};

export default RecipeCard;
