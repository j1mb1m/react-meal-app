import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import APIService from '../../API/APIService';
import { useFetching } from '../../hooks/useFetching';
import Loader from '../../components/UI/Loader/Loader';
import './RecipePage.css'
import CommentsBox from '../../components/CommentsBox/CommentsBox';

function RecipePage() {
  const params = useParams();

  const [meals, setMeals] = useState([]);
  const [fetchData, isLoading, Error] = useFetching(async (name) => {
    const data = await APIService.getRecipeByMeal(name);
    setMeals(data);
  });

  useEffect(() => {
    fetchData(params.name);
  }, []);

  function showIngredients(el) {
    let i = 1;
    let arr = [];
    while (('strIngredient' + i) in el && el['strIngredient' + i]) {
      arr.push({ ingredient: el['strIngredient' + i], measure: el['strMeasure' + i] })
      i++;
    }
    return arr;
  }

  return (
    <div className='container'>

      {isLoading && <Loader />}
      {Error && <h1>The error occurred</h1>}

      <div className='Recipes'>{meals.map(el => {
        return <div key={el.idMeal} className='Recipe'>

          <div><span>Meal: </span>{el.strMeal}</div>
          <div><span>Category: </span>{el.strCategory}</div>
          <div><span>Area: </span>{el.strArea}</div>

          <div className='img-wrapper'>
            <div className='RecipeImg'>
              <img src={el.strMealThumb} alt={el.strMeal} />
            </div>
            <div className='Ingredients'>
              <img className='paper-clip' src={require('../../images/skrepka_64.png')} alt='skrepka' />
              <span>Ingredients: </span>
              {showIngredients(el).map((i, index) =>
                <div key={index} className='Ingredient'>
                  <p>{i.ingredient} </p>
                  <div className='DashedSpace'></div>
                  <p>{i.measure}</p>
                </div>)}
            </div>
          </div>

          <div>
            <span>Instruction: </span>{el.strInstructions}
          </div>

          <a href={el.strYoutube}>Youtube</a>
          <CommentsBox id={el.idMeal} />
        </div>
      }
      )}
      </div >
    </div >
  )
}

export default RecipePage
