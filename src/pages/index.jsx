import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faAppStore } from '@fortawesome/fontawesome-free-brands'
import '../App.css';

import SideBar from './SideBar'

class MainPage extends React.Component {

    render() {
        return (
            <div className="homePageDiv">
                <SideBar />
                <div className="homePageButtons">
                    <h3 className="mainMenu">Main Menu</h3>
                    <br/>
                    <a href="/devices">
                        <div className="deviceButton">
                            <FontAwesomeIcon className="mobileIconButton" icon={ faMobileAlt } size="5x"/>
                            <p></p>
                            <p>Devices</p>
                        </div>
                    </a>
                    <a href="/users">
                        <div className="userButton">
                            <FontAwesomeIcon className="userIconButton" icon={ faUserFriends } size="5x"/>
                            <p></p>
                            <p>Manage Users</p>
                        </div>
                    </a>
                    <a href="/apps">
                        <div className="appButton">
                        <FontAwesomeIcon className="appIconButton" icon={faAppStore} size="5x"/>
                        <p></p>
                        <p>App Managment</p>
                        </div>
                    </a>
                </div>
            </div>
        )
    }
}

export default MainPage