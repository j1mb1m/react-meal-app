import React from 'react'
import PropTypes from 'prop-types'
import './CategoryCard.css'
import { useNavigate } from 'react-router-dom';

function CategoryCard(props) {
    const navigate = useNavigate();

    return (
        <div className='category-item' onClick={() => navigate(`/meals?category=${encodeURIComponent(props.title)}`)}  >
            <div className='img'>
                <img src={props.image} alt={props.title}></img>
            </div>
            <div className='title'>
                {props.title}
            </div>
        </div>
    )
}

CategoryCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
}

export default CategoryCard
