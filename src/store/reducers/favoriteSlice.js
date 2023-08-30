import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '../../utils/locaStorage';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    data: getLocalStorage('favorite-data'),
  },
  reducers: {
    addToFavorite(state, action) {
      state.data.push({
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
      })
    },
    removeFromFavorite(state, action) {
      state.data = state.data.filter(item => item.id !== action.payload);
    
    },
  }
})

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer









/* const ADD_RECIPE_TO_FAVORITE = 'ADD_RECIPE_TO_FAVORITE';
const REMOVE_RECIPE_TO_FAVORITE = 'REMOVE_RECIPE_TO_FAVORITE';

const defaultState = {
    favoriteMeals: [{ id: 1, name: 'One' },
    { id: 1, name: 'One' },]
};

export const favoriteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_RECIPE_TO_FAVORITE:
            return { ...state, favoriteMeals: [...state.favoriteMeals, action.payload] }
        case REMOVE_RECIPE_TO_FAVORITE:
            return { ...state, favoriteMeals: state.favoriteMeals.filter(meal => meal.idMeal !== action.payload) }
        default:
            return state;
    }
}


export const addRecipeToFavorite = (payload) => ({
    type: ADD_RECIPE_TO_FAVORITE,
    payload
})

export const removeRecipeFromFavorite = (payload) => ({
    type: REMOVE_RECIPE_TO_FAVORITE,
    payload
})
 */

