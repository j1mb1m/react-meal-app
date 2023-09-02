import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Header = () => {
    const storeDate = useSelector(state => state.favorite);
    const [count, setCount] = useState(0);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const menuRef = useRef(null);
    const burgerRef = useRef(null);

    useEffect(() => {
        setCount(storeDate.data.length);
    }, [storeDate])

    useEffect(() => {
        document.addEventListener('click', closeAll);
        return () => {
            document.removeEventListener('click', closeAll);
        };
    }, []);

    function closeAll(e) {
        if (
            menuRef.current &&
            !menuRef.current.contains(e.target) &&
            e.target !== burgerRef.current
        ) {
            setIsOpenMenu(false);
        }
    }

    return (
        <>
            <header className='Navbar'>
                <div className='container'>
                    <div ref={burgerRef} className={isOpenMenu ? 'hamburger-menu open-menu' : 'hamburger-menu'}
                        onClick={(e) => {
                            setIsOpenMenu(prev => !prev);
                        }}>
                        <span></span>
                    </div>
                    <ul ref={menuRef} className={isOpenMenu ? 'open-menu' : ''} onClick={() => setIsOpenMenu(false)}>
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
