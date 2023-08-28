import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FavoriteButton } from './UI/button/FavoriteButton';
import PropTypes from 'prop-types';
import { addToFavorite, removeFromFavorite } from "../store/reducers/favoriteSlice";
import { useState } from 'react';
import { useEffect } from 'react';
import './FavoriteCard.css';

function FavoriteCard({ id, name, image }, ref) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeDate = useSelector(state => state.favorite);

    const remove = () => {
        dispatch(removeFromFavorite(id));
    }

    return (
        <div ref={ref} className='favorite-item' onClick={() => navigate(`/recipe/${name}`)}  >
            <div className='img'>
                <img src={image} />
            </div>
            <div className='title'>
                {name}
            </div>
            <div className='btn'>
                <FavoriteButton isActive={true} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    remove();
                }}>Remove from favorite</FavoriteButton>
            </div>
        </div>
    )
}
/* FavoriteCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
} */

export default React.forwardRef(FavoriteCard);