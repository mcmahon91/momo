import React from 'react';

import './SideDraw.css'

const SideDraw = props => (
    <nav className="side-drawer">
        <p className="mobileMonitoring">Mobile Monitoring</p>
        <br />
        <a href="/" className="mainMenuText "><p>Main Menu</p></a>
        <a href="/devices" className="devicesText"><p>Devices</p></a>
        <a href="/users" className="usersText"><p>Manage Users</p></a>
        <a href="/apps" className="appText"><p>App Management</p></a>
        <div className="bottomButtons">
            <a href="/" className=""><p>Settings</p></a>
            <a href="/" className=""><p>Logout</p></a>
        </div>
    </nav>
)

export default SideDraw