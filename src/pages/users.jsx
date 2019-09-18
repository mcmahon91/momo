import React, {Component} from 'react';
import '../App.css';
import {testdatabase} from "../firebase.js"
import firebase from 'firebase';
import SideBar from './SideBar'
import OnePhone from '../userComponents'

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

        console.log(this.state.users)
    }



    render(){
        return (
            <div>
                <SideBar />
                <div className="userPageDiv">
                    <h3>Users</h3>
                    <div className="userList">
                        <div style={{backgroundColor: "rgb(125,166,177)"}}>
                            <OnePhone 
                                userid={"User ID"}
                                firstName={"First Name"}
                                lastName={"Last Name"}
                            />
                        </div>
                        {this.state.users.map((user, index) =>
                            <OnePhone 
                                userid={user.userID}
                                firstName={user.firstName}
                                lastName={user.lastName}
                            />
                        )}
                    </div>


                </div>
            </div>
        )
    }
}

export default UserPage