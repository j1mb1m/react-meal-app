import React from 'react';
import './CommentItem.css'
import PropTypes from 'prop-types';

function CommentItem({ user, milliseconds, comment }) {
    return (
        <div className='comment-item'>
            <div className='header'>
                <div className='avatar'>
                    <img src={'https://cs14.pikabu.ru/avatars/1607/x1607367-1563146339.png'} alt='avatar' />
                </div>
                <div className='signature'>
                    <span className='user'>{user}</span>
                    <span className='date'>{new Date(milliseconds).toLocaleDateString()}</span>
                </div>
            </div>
            <div className='caption'>{comment}</div>
        </div>
    );
}
CommentItem.propTypes = {
    user: PropTypes.string.isRequired,
    milliseconds: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
}

export default CommentItem;