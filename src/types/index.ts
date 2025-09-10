export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IRecipeResponse {
  limit: number;
  recipes: IRecipe[];
  skip: number;
  total: number;
}

export interface IRecipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
  cookTimeMinutes: number;
}

export interface IRecipeDetails extends IRecipe {
  prepTimeMinutes: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
  caloriesPerServing: number;
  mealType: string[];
  tags: string[];
}
