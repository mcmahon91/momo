import React from 'react';
import { Link } from "react-router-dom"
import './SideDraw.css'

const SideDraw = props => (
    <nav className="side-drawer">
        <p className="mobileMonitoring">Mobile Monitoring</p>
        <br />
        <Link to="/"><p>Main Menu</p></Link>
        <Link to="/devices"><p>Devices</p></Link>
        <Link to="/users"><p>Manage Users</p></Link>
        <Link to="/apps"><p>App Management</p></Link>
        <div className="bottomButtons">
        <Link to="/"><p>Settings</p></Link>
        <Link to="/"><p>Logout</p></Link>
        </div>
    </nav>
)

export default SideDraw


{/* <Link to="/"><a href="/" className="mainMenuText "><p>Main Menu</p></a></Link>
<Link to="/devices"><a href="/devices" className="devicesText"><p>Devices</p></a></Link>
<Link to="/users"><a href="/users" className="usersText"><p>Manage Users</p></a></Link>
<Link to="/apps"><a href="/apps" className="appText"><p>App Management</p></a></Link>
<div className="bottomButtons">
<Link to="/"><p>Settings</p></Link>
<Link to="/"><p>Logout</p></Link> */}