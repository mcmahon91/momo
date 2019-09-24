import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


import './DrawToggleButton.css';

const DrawerToggleButton = props => (
    <a href="/" onClick={props.click}><FontAwesomeIcon className="bars" icon={ faBars }/></a>
)

export default DrawerToggleButton