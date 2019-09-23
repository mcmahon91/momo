import React, {Component} from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



class AddUserForm extends Component {
    
    state = this.props.state

    onSubmit = (a) => {
        a.preventDefault();
        console.log("Worked")
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const userID = this.userID.value;
        const key = this.props.prevKey + 1;
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
            required
            />
            <input
            type="text"
            className="firstNameBox"
            placeholder="First Name"
            ref={input => this.firstName = input}
            required
            />
            <input
            type="text"
            className="lastNameBox"
            placeholder="Last Name"
            ref={input => this.lastName = input}
            required
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