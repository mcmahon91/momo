import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import {testdatabase} from "../firebase.js"
import firebase from 'firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'
import SideBar from './SideBar'

class UserPage extends Component {

    app = firebase.initializeApp(testdatabase);
    users = this.app.database().ref().child('users')

    state = {

        "phones" : [
        ],
    
        users: [
        ],
    
    }

    componentDidMount() {
        this.users.on('value', snap =>{
            this.setState({
                users: snap.val()
            })
        })
    }



    render(){
        return (
            <div>
                <SideBar />
                <div className="userPageDiv">
                    <h3>Users</h3>

                </div>
            </div>
        )
    }
}

export default UserPage