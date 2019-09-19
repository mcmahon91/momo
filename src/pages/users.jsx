import React, {Component} from 'react';
import '../App.css';
import {userdatabase} from "../databases/userdatabase.js"
import firebase from 'firebase';
import SideBar from './SideBar'
import OneUser from '../userComponents'

class UserPage extends Component {

    userDatabase = firebase.initializeApp(userdatabase);
    users = this.userDatabase.database().ref()

    state = {
        "users": []
    }

    componentDidMount() {
        this.users.on('value', snap =>{
            this.setState({
                users: snap.val()
            })
        })
    }

    onSubmit = (a) => {
        a.preventDefault();
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const userID = this.userID.value;
        const key = this.state.users.length;

        const info = {Key: key.toString(), firstName: firstName, lastName: lastName, userID: userID};
        console.log(info)
        const data = [...this.state.users, info];
        console.log(data)
        // this.setState({
        //     data
        // });
        console.log(this.state)
        this.users.set(
            data
        )

        a.currentTarget.reset()
    }


    render(){
        return (
            <div>
                <SideBar />
                <div className="userPageDiv">
                    <h3 className="header">Users</h3>
                    <div className="userList">
                        <div style={{backgroundColor: "rgb(125,166,177)"}}>
                            <OneUser 
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
                            />
                        )}
                    </div>

                    <form className="form-inline" onSubmit={this.onSubmit}>
                        <input
                        type="text"
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="First Name"
                        ref={input => this.firstName = input}/>
                                                <input
                        type="text"
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Last Name"
                        ref={input => this.lastName = input}/>
                    <div className="input-group mb-2 mr-sm-2 mb-sm-0">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        ref={input => this.userID = input}/>
                    </div>  
                    <button 
                        type="submit" 
                        className="btn btn-primary">Save
                    </button>
                    </form>
                </div> 
            </div>
        )
    }
}

export default UserPage