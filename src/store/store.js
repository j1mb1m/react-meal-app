/* import { createStore } from "redux"; */
import { setLocalStorage } from "../utils/locaStorage";
import favoriteReducer  from "./reducers/favoriteSlice";
 import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        favorite: favoriteReducer
    }
})

store.subscribe(() => {
    setLocalStorage('favorite-data', store.getState().favorite.data)
});
/* const store = createStore(favoriteReducer); */

export default store;
