import { useParams } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../features/api/apiSlice'; // Import correct du hook

const RecipeDetails = () => {
  const { id } = useParams(); // Récupère l'ID de la recette depuis l'URL

  // Utilisation du hook RTK Query pour récupérer les données
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(id);

  // Gestion des états de chargement et d'erreur
  if (isLoading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center">Erreur lors du chargement de la recette.</p>;
  if (!recipe) return <p className="text-center">Aucune recette trouvée.</p>;

  // Fonction pour diviser les instructions par point et retourner un tableau de paragraphes
  const renderInstructions = (instructions) => {
    return instructions.split('.').map((instruction, index) =>
        instruction.trim() ? <p key={index} className="pb-1">{instruction.trim()}.</p> : null
    );
  };

  return (
      <div className="bg-gradient-to-t from-transparent to-amber-100 pt-4">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">{recipe.strMeal}</h1>
          <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-semibold mb-3">Instructions :</h2>
          {renderInstructions(recipe.strInstructions)}
        </div>
      </div>
  );
};

export default RecipeDetails;
