import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIngredient, removeIngredient } from '../features/ingredientsSlice';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.value);

  // État local pour gérer l'édition
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [newConsumptionDate, setNewConsumptionDate] = useState('');
  const sortedIngredients = [...ingredients].sort((a, b) => new Date(a.consumptionDate) - new Date(b.consumptionDate));

  const handleEditClick = (ingredient) => {
    setEditingIngredient(ingredient);
    setNewQuantity(ingredient.measure);
    setNewConsumptionDate(ingredient.consumptionDate);
  };

  const handleUpdate = () => {
    if (editingIngredient) {
      dispatch(updateIngredient({
        name: editingIngredient.name,
        measure: newQuantity,
        consumptionDate: newConsumptionDate
      }));
      setEditingIngredient(null);
      setNewQuantity('');
      setNewConsumptionDate('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIngredient(null);
    setNewQuantity('');
    setNewConsumptionDate('');
  };

  const handleDelete = (ingredientName) => {
    dispatch(removeIngredient(ingredientName));
  };

  return (
    <div className='py-10 mx-32'>
      {ingredients.length === 0 ? (
        <p className='text-center'>Votre liste de courses est vide.</p>
      ) : (
        <div className='flex flex-wrap gap-10 justify-center'>
          {sortedIngredients.map((ingredient) => (
            <div key={ingredient.name} className="relative border py-4 px-7 rounded-lg shadow-md">
              <button 
                onClick={() => handleDelete(ingredient.name)} 
                className="absolute font-bold top-2 right-2 text-red-600 hover:text-red-800"
              >
                &#10005;
              </button>
              <h3 className='font-bold text-center mb-2'>{ingredient.name}</h3>
              <p className='py-1'><span className='font-semibold'>Quantité:</span> {ingredient.measure}</p>
              <p className='py-1'><span className='font-semibold'>Recette:</span> {ingredient.recipeName}</p>
              <p className='py-1'><span className='font-semibold'>Date de consommation:</span> {ingredient.consumptionDate}</p>

              {editingIngredient?.name === ingredient.name ? (
                <div>
                  <input
                    type="text"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    placeholder="Nouvelle quantité"
                    className="border p-1"
                  />
                  <input
                    type="date"
                    value={newConsumptionDate}
                    onChange={(e) => setNewConsumptionDate(e.target.value)}
                    className="border p-1 ml-2"
                  />
                  <div className='flex justify-center'>
                    <button onClick={handleUpdate} className="mt-4 bg-yellow-600 hover:bg-yellow-800 text-white rounded px-4 py-2">Sauvegarder</button>
                    <button onClick={handleCancelEdit} className="mt-4 bg-red-600 hover:bg-red-800 text-white rounded px-4 py-2 ml-2">Annuler</button>
                  </div>
                </div>
              ) : (
                <div className='flex justify-center'>
                  <button onClick={() => handleEditClick(ingredient)} className="mt-4 bg-yellow-600 hover:bg-yellow-800 text-white rounded px-4 py-2">Modifier</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
