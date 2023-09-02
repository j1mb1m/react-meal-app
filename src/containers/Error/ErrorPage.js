import React from 'react'
import { useSelector } from 'react-redux'
/* import PropTypes from 'prop-types' */

function ErrorPage() {
    const storeDate = useSelector(state => state.favoriteMeals);
    console.log(storeDate);

    return (
        <div className='container'>
            <h1>Page not found</h1>
        </div>

    )
}
/* 
ErrorPage.propTypes = {} */

export default ErrorPage
