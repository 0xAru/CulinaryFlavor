/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlannedRecipe } from '../features/recipesSlice';
import { addIngredient } from '../features/ingredientsSlice';
import { addEvent } from '../features/calendarSlice';

const Modal = ({ isOpen, onClose, recipe }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const dispatch = useDispatch();

  if (!isOpen || !recipe) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

      dispatch(addPlannedRecipe({
        recipeId: recipe.idMeal,
        recipeName: recipe.strMeal,
        date: selectedDate,
        ...recipe
      }));

      dispatch(addIngredient({ 
        recipe,
        consumptionDate: selectedDate 
      }));

      dispatch(addEvent({
        id: recipe.idMeal,
        title: recipe.strMeal,
        start: selectedDate,
        allDay: true
      }));

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="text-xl text-center font-bold mb-4">Ajouter au planning</h2>
        <p className="mb-3">Ajouter <span className='text-orange-800 underline'>{recipe.strMeal}</span> au menu du :</p>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="mt-4 bg-yellow-600  hover:bg-yellow-800 text-white rounded px-4 py-2">
              Annuler
            </button>
            <button
              type="submit"
              className=" mt-4 bg-yellow-600 hover:bg-yellow-800 text-white rounded px-4 py-2">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
