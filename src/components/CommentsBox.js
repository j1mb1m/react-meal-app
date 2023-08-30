import React from 'react';
import CommentItem from './CommentItem';
import './CommentsBox.css'

const CommentsBox = () => {
    return (
        <div className='comments-box'>
            <h2>All comments:</h2>
            <form className='comment-form' >
                <input type='text' name='name' placeholder="Your name..." />
                <textarea placeholder="Add a comment..." />
                <button type='button'>Send</button>
            </form>
            <div className='comment-wrapper'>
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </div>
        </div>
    );
};

export default CommentsBox;