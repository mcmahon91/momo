import React from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'
import '../App.css';


class MainPage extends React.Component {

    deviceRoute = () => {
        this.history.push('/devices')
    }

    render() {
        return (
            <div className="homePageDiv">
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
                    
                    
                    {/* <div className="deviceButton">
                    <Link to="/devices" >Devices</Link>
                    </div>
                    <div className="userButton"> 
                    <Link to="/users" >Users</Link>
                    </div>
                    <div className="appButton" >
                    <Link to="/apps" >Apps</Link>
                    </div> */}

                </div>
            </div>
        )
    }
}

export default MainPage