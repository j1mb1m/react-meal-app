import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MealPage from './containers/MealPage';
import HomePage from './containers/HomePage';
import AboutPage from './containers/AboutPage';
import Header from './components/UI/Navbar/Header';
import CategoriesPage from './containers/CategoriesPage';
import RecipePage from './containers/RecipePage';
import Favorites from './containers/Favorites';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route exact path='/' Component={HomePage} />
          <Route exact path='/meals/' Component={MealPage} />
          <Route exact path='/recipe/:name' Component={RecipePage} />
{/*           <Route exact path='/category' Component={CategoriesPage} /> */}
          <Route exact path='/about' Component={AboutPage} />
          <Route exact path='/favorites' Component={Favorites} />
        </Routes>
      </HashRouter>

    </>
  );
}

export default App;
