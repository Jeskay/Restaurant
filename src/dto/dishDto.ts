import { portionDto } from "./portionDto";

export interface DishDto {
    name: string;
    description?: string;
    image?: string;
    category: string;
}
export interface DishUpdateDto {
    name: string;
    description: string | undefined;
    category: string | undefined;
    image: string | undefined;
    portions: portionDto[];
}