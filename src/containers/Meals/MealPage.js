import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import './MealPage.css';
import { useFetching } from '../../hooks/useFetching';
import APIService from '../../API/APIService';
import MealCard from '../../components/MealCard';
import Loader from '../../components/UI/Loader/Loader';
import { CustomSelect } from '../../components/UI/select/CustomSelect';
import { Pagination } from '../../components/UI/pagination/Pagination';
import { getPageData } from '../../utils/pages';
import { getURLSearchParams } from '../../utils/url';
import { useRef } from 'react';
import { useLazyLoading } from '../../hooks/useLazyLoading';


function MealPage() {

    const [searchParams, setSearchParams] = useSearchParams();
    const ALL = 'All';
    const pageLimit = 51;
    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fetchCategories, , ErrorCategories] = useFetching(async () => {
        const data = await APIService.getCategories();
        setCategories(data);
    });
    const [selectedCategory, setSelectedCategory] = useState(ALL);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const lastElement = useRef();

    const [fetchData, isLoading, Error] = useFetching(async (name, limit, page) => {
        let data = [];
        setMeals(data);
        if (name === ALL) {
            data = await APIService.getMeals();
        }
        else {
            data = await APIService.getMealsByCategory(name);
        }
        const result = getPageData(data, limit, page);
        setTotalPages(result.totalCount);
        setMeals(result.data);
    });

    useEffect(() => {
        const search = getURLSearchParams(searchParams);
        if ('page' in search)
            setPage(Number(search.page));
        if ('category' in search)
            setSelectedCategory(search.category);
        fetchCategories();
    }, []);

    const data = useLazyLoading(meals, lastElement, 3);

    useEffect(() => {
        const search = getURLSearchParams(searchParams);
        let curPage = Number(search.page) || 1;
        let curCategory = search.category || ALL;
        if (curPage !== page) setPage(curPage);
        if (curCategory !== selectedCategory) setSelectedCategory(curCategory);
        setMeals([]);
        fetchData(curCategory, pageLimit, curPage);
    }, [searchParams]);

    const changePage = (page) => {
        const search = getURLSearchParams(searchParams);
        window.scrollTo(0, 0);
        setSearchParams({ ...search, page })
        resetPage(page);
    }

    const changeFilter = (value) => {
        if (value === ALL)
            setSearchParams({})
        else
            setSearchParams({ category: value })
        setSelectedCategory(value);
        resetPage(1);
    }

    function resetPage(pageNumber) {
        setPage(pageNumber);
        data.setItems([]);
        data.setVisibleCount(0);
    }

    return (

        <div className='container'>
            {
                !!ErrorCategories ? null : <CustomSelect options={categories} defaultValue={ALL} value={selectedCategory} onChange={(value) => changeFilter(value)}></CustomSelect>
            }

            <Pagination totalPages={totalPages} page={page} changePage={changePage}></Pagination>
            {isLoading && <Loader />}
            {Error && <h1>The error occurred</h1>}
            {<div className='meal-items' >
                {data.items.map(el =>
                    <MealCard key={el.idMeal} id={el.idMeal} name={el.strMeal} image={el.strMealThumb} />
                )}
            </div>}
            <div ref={lastElement} style={{ height: 0 }} />
            {!isLoading &&
                <Pagination totalPages={totalPages} page={page} changePage={changePage}></Pagination>}
        </div >
    )
}



export default MealPage
