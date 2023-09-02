import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FavoriteButton } from './UI/button/FavoriteButton';
/* import PropTypes from 'prop-types'; */
import { addToFavorite, removeFromFavorite } from "../store/reducers/favoriteSlice";
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../API/firebase';

function MealCard({ id, name, image }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storeDate = useSelector(state => state.favorite);
    const [isFavorite, setIsFavorite] = useState(false);
    const [totalComents, setTotalComents] = useState(0);

    useEffect(
        () => {
            onSnapshot(collection(db, "comments"), (snapshot) => {
                const arr = [];
                snapshot.docs.filter(item => item.id === id).map((items) => items.data().data.map(el => arr.push(el)));
                setTotalComents(arr.length);
            })

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
        <div className='meal-item' onClick={() => navigate(`/recipe/${name}`)}  >
            <div className='img'>
                <img src={image} loading='lazy' decoding='async' alt={name} />
            </div>
            <div className='title'>
                {name}
            </div>
            <div className='comments'>
                <img src={require("../images/commentmono_32.png")} loading='lazy' alt='comments' />
                <span className='counter'>{totalComents}</span>
            </div>
            <div className='btn'>
                {isFavorite ?
                    <FavoriteButton isActive={isFavorite} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        remove();
                    }
                    }>Remove</FavoriteButton>
                    :
                    <FavoriteButton isActive={isFavorite} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        add();
                    }
                    }>Add</FavoriteButton>
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

export default MealCard;