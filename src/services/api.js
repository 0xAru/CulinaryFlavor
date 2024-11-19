const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories;
};

export const getRecipesByCategory = async (category) => {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
  const data = await response.json();
  return data.meals || [];
};

export const getRecipeById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};
  
