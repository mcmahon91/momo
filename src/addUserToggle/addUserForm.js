import React, {Component} from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



class AddUserForm extends Component {

    // userDatabase = firebase.initializeApp(testdatabase);
    // users = this.userDatabase.database().ref().child('users')


    
    state = this.props.state

            // componentDidMount() {
            //     // this.users.on('value', snap =>{
            //     //     this.setState({
            //     //         users: snap.val()
            //     //     })
            //     // })
            // }

    // updateTopState = ()

    onSubmit = (a) => {
        a.preventDefault();
        console.log("Worked")
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const userID = this.userID.value;
        const key = this.state.users.length;
        console.log(firstName)
        console.log(lastName)
        console.log(userID)
        console.log(key)

        const info = {Key: key.toString(), firstName: firstName, lastName: lastName, userID: userID};
        const data = [...this.state.users, info];
        console.log(info)
        console.log(data)

        this.props.updateState(data)
        this.props.removeNewUserinput()
        a.currentTarget.reset()
    }

    render() {
        return(
        <div>
            <form className="form-inline" onSubmit={this.onSubmit}>
            <input
            type="text"
            className="userIdBox"
            placeholder="User ID"
            ref={input => this.userID = input}
            />
            <input
            type="text"
            className="firstNameBox"
            placeholder="First Name"
            ref={input => this.firstName = input}
            />
            <input
            type="text"
            className="lastNameBox"
            placeholder="Last Name"
            ref={input => this.lastName = input}
            />
            <button 
            type="submit" 
            className="appButtonSubmit">
                <FontAwesomeIcon icon={faCheck} />
            </button>
            </form>
        </div>
        )
    }
}

export default AddUserForm