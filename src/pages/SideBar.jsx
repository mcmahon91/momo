import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore } from '@fortawesome/fontawesome-free-brands'
import '../App.css';
import DrawerToggleButton from '../SideDraw/DrawerToggleButton'
import SideDraw from '../SideDraw/SideDraw'
import Backdrop from '../SideDraw/Backdrop'
import Icon from '../momoicon/icon.png'

class SideBar extends Component {

    state = {
        sideDrawerOpen: false
    }

    drawerToggleClickHandler = (a) => {
        a.preventDefault()
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
        <div className="sidebarAndSideDraw">
            <div className="sidebar">
                <img 
                    style={{width: "33px", marginLeft: "4px", marginTop: "8px"}}
                    src={Icon}
                    alt={""}
                />
                <hr className="divider"/>
                <a href="/"><FontAwesomeIcon className="arrow" icon={ faArrowLeft }/></a>
                <DrawerToggleButton click={this.drawerToggleClickHandler}/>
                <a href="/devices"><FontAwesomeIcon className="mobile" icon={ faMobileAlt }/></a>
                <a href="/users"><FontAwesomeIcon className="user" icon={ faUserFriends }/></a>
                <a href="/apps"><FontAwesomeIcon className="apps" icon={faAppStore} size="2x"/></a>
                <div className="bottomButtons">
                <a href="/"><FontAwesomeIcon className="settings" icon={faCog}/></a>
                <a href="/"><FontAwesomeIcon className="signOut" icon={faSignOutAlt}/></a>
                </div>
            </div>
        {sideDrawer}
        {backdrop}
        </div>
    )}
    }


export default SideBar