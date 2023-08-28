import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const storeDate = useSelector(state => state.favorite);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(storeDate.data.length);
    }, [storeDate])

    return (
        <header className='Navbar'>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/meals' >Recipes</NavLink></li>
                {/*                 <li><NavLink to='/meals' >Meals</NavLink></li> */}
                <li><NavLink to='/about' >About</NavLink></li>
                <li><NavLink to='/favorites' >My recipes<span className='counter'>{count}</span></NavLink></li>
            </ul>
        </header>
    )
}

export default Header;
