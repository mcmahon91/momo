import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import {testdatabase} from "../firebase.js"
import firebase from 'firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBars, faMobileAlt, faUserFriends, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faAppStore, faAppStoreIos } from '@fortawesome/fontawesome-free-brands'


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
                <div className="userPageDiv">
                    <h3>Users</h3>


                </div>
            </div>
        )
    }
}

export default UserPage