import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.css';


const Loader = () => (
    <div className='loader-wrapper'>
        <ReactLoading type='spinningBubbles' color='#0f7dc6' width={100} />
    </div>
);

export default Loader;