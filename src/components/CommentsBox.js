import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import './CommentsBox.css'
import { arrayUnion, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../API/firebase';

const CommentsBox = ({ id }) => {

    const [user, setUser] = useState("");
    const [comment, setComment] = useState("");
    const [data, setData] = useState([]);

    useEffect(
        () => {
            validForm();

            onSnapshot(collection(db, "comments"), (snapshot) => {
                const arr = [];
                snapshot.docs.filter(item => item.id === id).map((items) => items.data().data.map(el => arr.push(el)));
                setData(arr);
            })
        }, []);
        
    const sendComment = () => {

        if (validForm()) {
            setDoc(doc(db, "comments", id), {
                data: arrayUnion({
                    user,
                    milliseconds: new Date().getTime(),
                    value: comment
                })
            }, { merge: true })
        }
    }

    const validForm = () => {

        return (!!user && !!comment);
    }

    return (
        <div className='comments-box'>
            <h2>All comments:</h2>
            <form className='comment-form' >
                <input type='text' name='name' placeholder="Your name..." onChange={(e) => setUser(e.target.value)} />
                <textarea placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)} />
                <button type='button' disabled={!validForm()} onClick={sendComment}>Send</button>
            </form>
            <div className='comment-wrapper'>
                {
                    data.map(item => <CommentItem
                        key={item.milliseconds}
                        user={item.user}
                        milliseconds={item.milliseconds}
                        comment={item.value} />)
                }
            </div>
        </div>
    );
};

export default CommentsBox;