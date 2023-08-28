import React from 'react'
import { useSelector } from 'react-redux'
import FavoriteCard from '../components/FavoriteCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
/* import PropTypes from 'prop-types' */

function Favorites() {
  const storeDate = useSelector(state => state.favorite);
  const nodeRef = React.useRef(null);

  return (
    <div className='container'>
      <h1>Favorites</h1>
      <TransitionGroup>
        {storeDate.data.map(el =>
          <CSSTransition
            key={el.id}
            timeout={500}
            classNames='favorite-item'
          >
            <FavoriteCard ref={nodeRef} id={el.id} name={el.name} image={el.image} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>

  )
}
/* 
HomePage.propTypes = {} */

export default Favorites
