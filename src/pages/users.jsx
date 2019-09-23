import React, {Component} from 'react';
import '../App.css';
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';
import SideBar from './SideBar'
import OneUser from '../userComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AddUser from '../addUserToggle/addUserToggle'
import OneUserTitle from '../userTitle'

class UserPage extends Component {

    userDatabase = firebase.initializeApp(testdatabase);
    users = this.userDatabase.database().ref().child('users')
    prevKeyValue = this.userDatabase.database().ref().child('prevKey');
    state = {
        "users": [],
        "prevKey": 0
    };


    componentDidMount() {
        this.users.on('value', snap =>{
            this.setState({
                users: snap.val()
            })
        })

        this.prevKeyValue.on('value', snap =>{
            this.setState({
                prevKey: snap.val()
            })
        })

    }

    updateState = (newState) => {
        this.users.set(
            newState
        )

        this.state.prevKey = parseInt(this.state.prevKey) + 1
        this.prevKeyValue.set(
            this.state.prevKey
        )
    }

    deleteUser = (id) => {

        console.log(this.state)
        console.log(id)
        this.setState((prevState) => ({
            users: prevState.users.filter(user => user.Key !== id)
        }))
    }



    updateUserInDatabase = (updatedUserinfo, Key) => {
        let users = this.state.users
        let accessUserDatabase = this.users
        let checkUsers = users.map(updateUser)
        function updateUser(user){
            if(user.Key == Key){
                accessUserDatabase.child(user.Key).set({
                    "Key": updatedUserinfo.Key,
                    "firstName" : updatedUserinfo.firstName,
                    "lastName" : updatedUserinfo.lastName,
                    "userID" : updatedUserinfo.userID
                })
            }
        }
    }


    render(){
        return (
            <div>
                <SideBar />
                <div className="userPageDiv">
                    <h3 className="header">Users</h3>
                    <div className="userList">
                        <div style={{backgroundColor: "rgb(125,166,177)"}}>
                            <OneUserTitle 
                                userid={"User ID"}
                                firstName={"First Name"}
                                lastName={"Last Name"}

                            />
                        </div>
                        {this.state.users.map((user, index) =>
                            <OneUser
                                userid={user.userID}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                Key={user.Key}
                                deleteUser={this.deleteUser}
                                updateUserInDatabase={this.updateUserInDatabase}
                            />,
                        )}
                        <AddUser updateState={this.updateState} state={this.state} prevKey={this.state.prevKey}/>
                    </div>
                </div> 
            </div>
        )
    }
}

export default UserPage