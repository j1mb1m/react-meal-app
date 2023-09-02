import { createRef } from "react";
import AboutPage from "../containers/About/AboutPage";
import FavoritesPage from "../containers/Favorites/FavoritesPage";
import HomePage from "../containers/Home/HomePage";
import MealPage from "../containers/Meals/MealPage";
import RecipePage from "../containers/Recipe/RecipePage";

const routes = [
    { path: '/', exact: true, name: 'Home', Component: HomePage, nodeRef: createRef()},
    { path: '/recipe/:name', exact: true, name: 'Recipe', Component: RecipePage, nodeRef: createRef()},
    { path: '/meals', exact: true, name: 'Recipes', Component: MealPage, nodeRef: createRef()},
    { path: '/about', exact: true, name: 'About', Component: AboutPage, nodeRef: createRef()},
    { path: '/favorites', exact: true, name: 'Favorites', Component: FavoritesPage, nodeRef: createRef()},
/*     { path: '*', exact: true, name: 'Home', Component: HomePage}, */
]
export default routes;

