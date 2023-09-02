import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { removeFromFavorite } from "../../store/reducers/favoriteSlice";
import { useCallback } from 'react';
import { useRef } from 'react';
import { useLazyLoading } from '../../hooks/useLazyLoading';
/* import PropTypes from 'prop-types' */

function FavoritesPage() {
  const storeData = useSelector(state => state.favorite);
  const dispatch = useDispatch();
  const lastElement = useRef();

  const remove = useCallback(id => {
    dispatch(removeFromFavorite(id));
    data.setVisibleCount(prev => prev - 1);
  }, []);

  const data = useLazyLoading(storeData.data, lastElement, 5);

  return (
    <div className='container'>
      <h1>Favorites</h1>
      <TransitionGroup>
        {data.items.map(el =>
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

export default FavoritesPage
