export interface Dish {
    _id: string;
    author: number;
    comments: Comment[];
    description: string;
    dislikes: number;
    ingredients: string[];
    likes: number;
    name: string;
    price: number;
}

export interface Comment {
    _id: string;
    author: number;
    date: Date;
    text: string;
}
