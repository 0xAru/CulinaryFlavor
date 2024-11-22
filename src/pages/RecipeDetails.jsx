import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipeById } from '../services/api'; // Assurez-vous d'avoir cette fonction

const RecipeDetails = () => {
  const { id } = useParams(); // Récupère l'ID de la recette depuis l'URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de la recette:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className='text-center'>Chargement...</p>;

  if (!recipe) return <p className='text-center'>Aucune recette trouvée.</p>;

// Fonction pour diviser les instructions par point et retourner un tableau de paragraphes
const renderInstructions = (instructions) => {
  return instructions.split('.').map((instruction, index) => (
    instruction.trim() ? <p key={index} className='pb-1'>{instruction.trim()}.</p>: null
  ));
};

  return (
    <div className='bg-gradient-to-t from-transparent to-amber-100 pt-4'>
      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover rounded mb-4" />
        <h2 className="text-xl font-semibold mb-3">Instructions :</h2>
        {renderInstructions(recipe.strInstructions)}
      </div>
    </div>
  );
};

export default RecipeDetails;
