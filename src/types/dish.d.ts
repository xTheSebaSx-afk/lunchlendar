export interface Dish {
    _id: string;
    author: Author;
    comments: Comment[];
    date: DateClass;
    description: string;
    ingredients: Ingredient[];
    name: string;
    opinions: Opinion[];
    price: number;
    steps: Step[];
}

export interface Author {
    _id: string;
    username: string;
}

export interface Comment {
    _id: string;
    author: Author;
    date: Date;
    text: string;
}

export interface DateClass {
    createdAt: Date;
    updatedAt: Date;
}

export interface Ingredient {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
}

export interface Opinion {
    _id: string;
    author: string;
    type: string;
}

export interface Step {
    _id: string;
    description: string;
    order: number;
}

export type DishesContextType = {
    dishes: Dish[]
    addDish: (dish: Dish) => void
    loading: boolean
}
