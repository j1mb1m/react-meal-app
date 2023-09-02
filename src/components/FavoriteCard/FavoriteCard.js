import React from 'react'
import { FavoriteButton } from '../UI/button/FavoriteButton';
/* import PropTypes from 'prop-types';  */
import './FavoriteCard.css';
import { memo } from 'react';
import { useNavigate } from 'react-router';


function FavoriteCard({ id, name, image, cbRemove }, ref) {
    const navigate = useNavigate();

    return (

        <div ref={ref} className='favorite-item' onClick={() => navigate(`/recipe/${name}`)}  >
            <div className='img'>
                <img src={image + '/preview'} alt={name} />
            </div>
            <div className='title'>
                {name}
            </div>
            <div className='btn'>
                <FavoriteButton isActive={true} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    cbRemove(id);
                }}>Remove</FavoriteButton>
            </div>
        </div>
    )
}
/* FavoriteCard.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
} */

export default memo(React.forwardRef(FavoriteCard));