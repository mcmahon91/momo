import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'
import Toggle from './toggle'


const AppsPage = () => {
    return (
        <div>
                <div className="sidebar">
                    <p className="divider">____</p>
                    <a href="/"><FontAwesomeIcon className="arrow" icon={ faArrowLeft }/></a>
                    <FontAwesomeIcon className="bars" icon={ faBars }/>
                    <a href="/devices"><FontAwesomeIcon className="mobile" icon={ faMobileAlt }/></a>
                    <a href="/users"><FontAwesomeIcon className="user" icon={ faUserFriends }/></a>
                    <a href="/apps"><FontAwesomeIcon className="apps" icon={faAppStore} size="2x"/></a>
                    <div className="bottomButtons">
                    <a href=""><FontAwesomeIcon className="settings" icon={faCog}/></a>
                    <a href=""><FontAwesomeIcon className="signOut" icon={faSignOutAlt}/></a>
                    </div>
                </div>
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