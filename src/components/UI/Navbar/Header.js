import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Header = () => {
    const storeDate = useSelector(state => state.favorite);
    const [count, setCount] = useState(0);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    useEffect(() => {
        setCount(storeDate.data.length);
    }, [storeDate])

    const changeStyle = () => {
        setIsOpenMenu(prev => !prev);
    }

    return (
        <>
            <header className='Navbar'>
                <div className='container'>
                    <div className={isOpenMenu ? 'hamburger-menu open-menu' : 'hamburger-menu'} onClick={changeStyle}>
                        <span></span>
                    </div>
                    <ul className={isOpenMenu ? 'open-menu' : ''} onClick={()=>setIsOpenMenu(false)}>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/meals' >Recipes</NavLink></li>
                        <li><NavLink to='/about' >About</NavLink></li>
                        <li><NavLink to='/favorites' >My recipes<span className='counter'>{count}</span></NavLink></li>
                    </ul>
                </div>
            </header >
        </>
    )
}

export default Header;
