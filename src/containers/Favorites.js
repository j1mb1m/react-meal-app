import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteCard from '../components/FavoriteCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { removeFromFavorite } from "../store/reducers/favoriteSlice";
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createRef } from 'react';
/* import PropTypes from 'prop-types' */

function Favorites() {
  const storeDate = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(0);

  const lastElement = useRef();
  const observer = useRef();
  const nodeRefs = useRef({});
  /*   const nodeRef = createRef(null); */

  const remove = useCallback(id => {
    dispatch(removeFromFavorite(id));
    setVisibleItems(prev => prev - 1);
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && visibleItems < storeDate.data.length) {
        const result = storeDate.data.slice(0, visibleItems + 1).map(el => {
          let nodeRef;
          if (el.id in nodeRefs.current) {
            nodeRef = nodeRefs.current[el.id];
          }
          else {
            nodeRef = createRef(null);
            nodeRefs.current[el.id] = nodeRef;
          }
          return { ...el, nodeRef }
        });
        setItems(result);
        setVisibleItems(result.length);
      }
      else if (items.length !== visibleItems) {
        const result = storeDate.data.slice(0, visibleItems).map(el => {
          let nodeRef;
          if (el.id in nodeRefs.current) {
            nodeRef = nodeRefs.current[el.id];
          }
          else {
            nodeRef = createRef(null);
            nodeRefs.current[el.id] = nodeRef;
          }
          return { ...el, nodeRef }
        });
        setItems(result);
      }
    }
    if (lastElement.current) {
      observer.current = new IntersectionObserver(callback);
      observer.current.observe(lastElement.current);
    }

  }, [visibleItems, storeDate, items]);

  return (
    <div className='container'>
      <h1>Favorites</h1>
      <TransitionGroup>
        {items.map(el =>
          <CSSTransition
            key={el.id}
            timeout={500}
            classNames='favorite-item'
            nodeRef={el.nodeRef}
          >
            <FavoriteCard key={el.id} ref={el.nodeRef} id={el.id} name={el.name} image={el.image} cbRemove={remove} />
          </CSSTransition>
        )}
      </TransitionGroup>
      <div ref={lastElement} style={{ height: 0 }} />
    </div>

  )
}

export default Favorites
