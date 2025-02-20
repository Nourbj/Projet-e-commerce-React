const API_URL = "http://localhost:3000/categories";

export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const categories = data.map(item => item.name);
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
};
 