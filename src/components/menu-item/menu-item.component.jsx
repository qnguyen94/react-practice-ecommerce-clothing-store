import React from 'react';
import { withRouter } from 'react-router-dom'; //Higher order component -> Takes component as argument-> Returns modified component

import './menu-item.styles.scss'

const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => 
    <div className={`${size} menu-item`} onClick={()=> history.push(`${match.url}${linkUrl}`)}>
        <div style={{backgroundImage:`url(${imageUrl})`}} className="background-image"></div>
        <div className='content'>
            <div className='title'>{title.toUpperCase()}</div>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>


export default withRouter(MenuItem);
//Returns MenuItem that has access to location, match, and history props from React Router