import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'
import Toggle from './toggle'
import SideBar from './SideBar'

const AppsPage = () => {
    return (
        <div>
        <SideBar />
                <div className="appPageDiv">
            <h3>Apps</h3>
            <small>Apps Page</small>
            <Link to="/users">Users</Link>
            <Link to="/devices">Devices</Link>
            <Link to="/">home</Link>
            </div>
            <Toggle />
        </div>
    )
}

export default AppsPage