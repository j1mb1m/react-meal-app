import React, { useEffect, useState } from 'react'
import CategoryCard from '../components/CategoryCard';
import APIService from '../API/APIService';
import { useFetching } from '../hooks/useFetching';
import './CategoriesPage.css'
import Loader from '../components/UI/Loader/Loader';

function CategoriesPage() {

    const [categories, setCategories] = useState([]);
    const [fetchData, isLoading, Error] = useFetching(async () => {
        const data = await APIService.getCategories()
        setCategories(data);
    })

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
            {isLoading && <Loader />}
            {Error && <h1>The error occurred</h1>}         <div className='MealCategory' >

                {categories.map(el =>
                    <CategoryCard
                        key={el.idCategory}
                        id={el.idCategory}
                        title={el.strCategory}
                        image={el.strCategoryThumb} />
                )}
            </div>
        </div>
    )
}



export default CategoriesPage
