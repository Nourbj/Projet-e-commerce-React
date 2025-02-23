const API_URL = "http://localhost:3000/categories";

export const getCategories = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur API :", error);
    return [];
  }
};

//  extraire une catégorie à partir du nom d'une image

export  const getCategoryFromImage = (imageName) => {
  if (!imageName) return "Unknown";  
  const category = imageName.split("-")[0].toLowerCase();
  return category.charAt(0).toUpperCase() + category.slice(1);
};