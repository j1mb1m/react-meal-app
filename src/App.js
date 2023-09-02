import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/UI/Navbar/Header';
import React from 'react';
import routes from './routes/routes';



function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          {routes.map(({ path, Component, exact }) => (
            <Route key={path} path={path} exact={exact}
              element={<Component />}
            />
          ))}
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
