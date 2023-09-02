import React, { useEffect, useRef, useState } from 'react';
import CommentItem from '../CommentsItem/CommentItem';
import './CommentsBox.css'
import { arrayUnion, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../API/firebase';
import { useLazyLoading } from '../../hooks/useLazyLoading';

const CommentsBox = ({ id }) => {

    const [user, setUser] = useState('');
    const [comment, setComment] = useState('');
    const [loadedData, setloadedData] = useState([]);
    const lastElement = useRef();

    useEffect(
        () => {
            onSnapshot(collection(db, "comments"), (snapshot) => {
                const arr = [];
                snapshot.docs.filter(item => item.id === id).map((items) => items.data().data.map(el => arr.push(el)));
                setloadedData(arr);
            })
        }, []);

    const data = useLazyLoading(loadedData, lastElement);

    const sendComment = () => {

        if (validForm()) {
            setDoc(doc(db, "comments", id), {
                data: arrayUnion({
                    user,
                    milliseconds: new Date().getTime(),
                    value: comment
                })
            }, { merge: true })
            setUser('');
            setComment('');
        }
    }

    const validForm = () => {
        return (!!user && !!comment);
    }

    return (
        <div className='comments-box'>
            <h2>All comments:</h2>
            <form className='comment-form' >
                <input type='text' name='name' placeholder="Your name..." defaultValue={user} onChange={(e) => setUser(e.target.value)} />
                <textarea placeholder="Add a comment..." defaultValue={comment} onChange={(e) => setComment(e.target.value)} />
                <button type='button' disabled={!validForm()} onClick={sendComment}>Send</button>
            </form>
            <div className='comment-wrapper'>
                {
                    data.items.map(item => <CommentItem
                        key={item.milliseconds}
                        user={item.user}
                        milliseconds={item.milliseconds}
                        comment={item.value} />)
                }
            </div>
            <div ref={lastElement} style={{ height: 0 }} />
        </div>
    );
};

export default CommentsBox;