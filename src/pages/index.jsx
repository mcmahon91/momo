import React from 'react';
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'
import '../App.css';
import Toggle from './toggle'
import DrawerToggleButton from '../SideDraw/DrawerToggleButton'
import SideDraw from '../SideDraw/SideDraw'
import Backdrop from '../SideDraw/Backdrop'

class MainPage extends React.Component {

    // deviceRoute = () => {
    //     this.history.push('/devices')
    // }
    state ={
        sideDrawerOpen: false
    }
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        })
    }

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false})
    }

    render() {
        let sideDrawer;
        let backdrop;

        if(this.state.sideDrawerOpen) {
            sideDrawer = <SideDraw />;
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }

        return (
            <div className="homePageDiv">
                <div className="sidebar">
                    <p className="divider">____</p>
                    <a href="/"><FontAwesomeIcon className="arrow" icon={ faArrowLeft }/></a>
                    {/* <Toggle /> */}
                    <DrawerToggleButton click={this.drawerToggleClickHandler}/>
                    {/* <FontAwesomeIcon className="bars" icon={ faBars }/> */}
                    <a href="/devices"><FontAwesomeIcon className="mobile" icon={ faMobileAlt }/></a>
                    <a href="/users"><FontAwesomeIcon className="user" icon={ faUserFriends }/></a>
                    <a href="/apps"><FontAwesomeIcon className="apps" icon={faAppStore} size="2x"/></a>
                    <div className="bottomButtons">
                    <a href=""><FontAwesomeIcon className="settings" icon={faCog}/></a>
                    <a href=""><FontAwesomeIcon className="signOut" icon={faSignOutAlt}/></a>
                    </div>
                </div>
                {sideDrawer}
                {backdrop}
                {/* <SideDraw />
                <Backdrop /> */}
                {/* <div className="extendedMenu">
                    <p className="mobileMonitoring">Mobile Monitoring</p>
                    <br />

                    <a href="/" className="mainMenuText "><p>Main Menu</p></a>
                    <a href="/devices" className=""><p>Devices</p></a>
                    <a href="/users" className=""><p>Manage Users</p></a>
                    <a href="/apps" className=""><p>App Management</p></a>
                    <div className="bottomButtons">
                        <a href="" className=""><p>Settings</p></a>
                        <a href="" className=""><p>Logout</p></a>
                    </div>
                </div> */}

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