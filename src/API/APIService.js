import { API_CATEGORIES, API_FILTER, API_SEARCH_BY_LETTER, API_SEARCH_BY_NAME } from "./api";

export default class APIService {

    static async #getApiResource(url) {
        const res = await fetch(url);
        return await res.json();
    }

    static async getCategories() {
        const res = await this.#getApiResource(API_CATEGORIES);
        return res.categories.map(el => { return { id: el.idCategory, name: el.strCategory, description: el.strCategoryDescription, image: el.strCategoryThumb } });
    }

    static async getRecipeByMeal(name) {
        const res = await this.#getApiResource(API_SEARCH_BY_NAME + encodeURIComponent(name));
        return res.meals;
    }

    static async getMeals() {
        const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
        const urls = [];
        let meals = [];
        alphabet.forEach(letter => urls.push(API_SEARCH_BY_LETTER + letter));

        await Promise.all(
            urls.map(url => this.#getApiResource(url))
        ).then((values) => {
            values.forEach(value => {
                if (value.meals !== null) {
                    meals = [...meals, ...value.meals]
                }
            })
        })
        return meals;
    }


    static async getMealsByCategory(name) {
        const res = await this.#getApiResource(API_FILTER + encodeURIComponent(name));
        return res.meals;
    }

}