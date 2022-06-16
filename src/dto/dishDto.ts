export interface DishDto {
    name: string;
    description?: string;
    image?: string;
    category: string;
}
export interface DishUpdateDto {
    description: string | undefined;
    image: string | undefined;
    category: string | undefined;
}