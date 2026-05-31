export interface Recipe {
    id: number;
    name: string;
    ingredients: string;
    instructions: string;
    cookingTime: number;
    category: string;
    imageUrl?: string;
}