import React from 'react';
import MenuItem from '../menu-item/menu-item.component'
import { createStructuredSelector } from 'reselect';

import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import { connect } from 'react-redux';

import './directory.styles.scss'

const Directory = ({ sections }) => {
    return(
        <div className='directory-menu'>
            {/* ES6 Syntax, spreading props */}
            {sections.map(({id, ...otherSectionProps}) => 
                <MenuItem key={id} {...otherSectionProps}/>   
            )}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);