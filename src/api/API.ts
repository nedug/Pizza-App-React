import axios from 'axios';
import { PizzaType } from '../components/PizzaBlock';


const instance = axios.create({
    baseURL: 'https://62b7ffc9f4cb8d63df575778.mockapi.io/',
});

export const API = {
    getAllPizzasWithCateg(categoriesId: number) {
        return instance.get<Array<PizzaType>>(`pizzas?${categoriesId > 0 ? `category=${categoriesId}` : ''}`);
    },
    getAllPizzasWithFilter(categoriesId: number, currentPage: number, searchValue: string, searchSort: string) {
        return instance.get<Array<PizzaType>>(`pizzas?page=${currentPage}&limit=4&${searchValue.length > 0 ? `search=${searchValue}` : ''}${categoriesId > 0 ? `category=${categoriesId}` : ''}&sortBy=${searchSort}&order=${searchSort === 'rating' ? 'desc' : 'asc'}`);
    },
};