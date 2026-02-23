export interface Dish {
    _id: string;
    author: Author;
    comments: Comment[];
    description: string;
    dislikes: number;
    ingredients: string[];
    likes: number;
    name: string;
    price: number;
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


export type DishesContextType = {
    dishes: Dish[]
    addDish: (dish: Dish) => void
    loading: boolean
}
