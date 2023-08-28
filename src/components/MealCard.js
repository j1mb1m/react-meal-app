import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FavoriteButton } from './UI/button/FavoriteButton';
/* import PropTypes from 'prop-types'; */
import { addToFavorite, removeFromFavorite } from "../store/reducers/favoriteSlice";
import { useState } from 'react';
import { useEffect } from 'react';

function MealCard({ id, name, image }, ref) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeDate = useSelector(state => state.favorite);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const hasID = storeDate.data.some(el => el.id === id);
        setIsFavorite(hasID);
    }, [])

    const add = () => {
        const meal = { id, name, image };
        setIsFavorite(true);
        dispatch(addToFavorite(meal));
    }

    const remove = (e) => {
        dispatch(removeFromFavorite(id));
        setIsFavorite(false);
    }


    return (
        <div className='meal-item' ref={ref} onClick={() => navigate(`/recipe/${name}`)}  >
            <div className='img'>
                <img src={image} />
            </div>
            <div className='title'>
                {name}
            </div>
            <div className='btn'>
                {isFavorite ?
                    <FavoriteButton isActive={isFavorite} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        remove();
                    }
                    }>Remove from favorite</FavoriteButton>
                    :
                    <FavoriteButton isActive={isFavorite} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        add();
                    }
                    }>Add to favorite</FavoriteButton>
                }
            </div>
        </div>
    )
}
/* MealCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
} */

export default React.forwardRef(MealCard);