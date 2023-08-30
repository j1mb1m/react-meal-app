import React from 'react';
import './CommentItem.css'

function CommentItem(props) {
    return (
        <div className='comment-item'>
            <div className='header'>
                <div className='avatar'>
                    <img src={'https://cs14.pikabu.ru/avatars/1607/x1607367-1563146339.png'} alt='avatar' />
                </div>
                <div className='signature'>
                    <span className='user'>Ghost</span>
                    <span className='date'>2023-08-30</span>
                </div>
            </div>
            <div className='caption'>Delisios!!!</div>
        </div>
    );
}

export default CommentItem;