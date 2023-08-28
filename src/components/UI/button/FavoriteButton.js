import React from 'react'
import './FavoriteButton.css';
import FavoriteIcon from '../Icon/FavoriteIcon';

export const FavoriteButton = ({ children, isActive, ...props }) => {
    let styles = ['fvr-button'];
    if (isActive) styles.push('fvr-button-active');

    return (
        <button {...props} className={styles.join(' ')}>
            {children} <FavoriteIcon color='none' size={20} />
        </button>
    )
}

