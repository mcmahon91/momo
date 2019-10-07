import React, {Component} from 'react';
import '../App.css';
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';
import SideBar from './SideBar'
import OneUser from '../userComponents'
import AddUser from '../addUserToggle/addUserToggle'
import OneUserTitle from '../userTitle'

class UserPage extends Component {

    userDatabase = !firebase.apps.length ? firebase.initializeApp(testdatabase) : firebase.app()
    users = this.userDatabase.database().ref().child('users')
    prevUserKeyValue = this.userDatabase.database().ref().child('prevUserKey');
    state = {
        "users": [],
        "prevUserKey": 0
    };

    componentDidMount() {
        this.users.on('value', snap =>{
            this.setState({
                users: snap.val()
            })
        })

        this.prevUserKeyValue.on('value', snap =>{
            this.setState({
                prevUserKey: snap.val()
            })
        })
    }

    updateState = (newState) => {
        this.users.set(
            newState
        )

        this.state.prevUserKey = parseInt(this.state.prevUserKey) + 1
        this.prevUserKeyValue.set(
            this.state.prevUserKey
        )
    }

    deleteUser = (key) => {
        let listOfUsers = this.state.users
        this.users.set(
            listOfUsers.filter(user => user.Key !== key)
        )
    }

    updateUserInDatabase = (updatedUserinfo, Key) => {
        let userss = this.state.users
        let i = 0 
        for(i = 0; i< userss.length; i++){
            if(userss[i].Key === Key){
                console.log(this.users.child(i))
                this.users.child(i).set({
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
                                userState={this.users}
                                updateUserInDatabase={this.updateUserInDatabase}
                            />,
                        )}
                        <AddUser updateState={this.updateState} state={this.state} prevUserKey={this.state.prevUserKey}/>
                    </div>
                </div> 
            </div>
        )
    }
}

export default UserPage