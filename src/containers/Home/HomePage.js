import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching';
import APIService from '../../API/APIService';
import Loader from '../../components/UI/Loader/Loader';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { useLazyLoading } from '../../hooks/useLazyLoading';
/* import PropTypes from 'prop-types' */

function HomePage() {
  const [categories, setCategories] = useState([]);
  const lastElement = useRef();
  const [fetchData, isLoading, Error] = useFetching(async () => {
    const data = await APIService.getCategories()
    setCategories(data);
  })

  useEffect(() => {
    fetchData();
  }, []);

  const data = useLazyLoading(categories, lastElement, 3);

  return (
    <div className='container'>
      <h1>Home</h1>
      {isLoading && <Loader />}
      {Error && <h1>The error occurred</h1>}
      <div className='MealCategory' >
        {data.items.map(el =>
          <CategoryCard
            key={el.id}
            id={el.id}
            title={el.name}
            image={el.image} />
        )}
        <div ref={lastElement} style={{ height: 0 }} />
      </div>

    </div>
  )

}
/* 
HomePage.propTypes = {} */

export default HomePage
