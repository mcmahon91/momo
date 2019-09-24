import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEdit, faCheck} from '@fortawesome/free-solid-svg-icons'

class OneUser extends Component {

    state ={
        users: this.props.userState,
        editData: false
    }

    editClickHandler = () => {
        this.setState((prevState) => {
            return{editData: !prevState.editData}
        })
    }

    updateUser = (a, Key) => {
        a.preventDefault();
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const userID = this.userID.value;
        const updatedUserinfo = {Key: Key, firstName: firstName, lastName: lastName, userID: userID}
        
        this.props.updateUserInDatabase(updatedUserinfo, Key)
        this.editClickHandler()
    }

    render(){

        let dataShown;

        if(!this.state.editData){
            dataShown = <div className="userLine">
                            <UserID userid={this.props.userid}/>
                            <FirstName firstName={this.props.firstName} />
                            <LastName lastName={this.props.lastName} />
                            <button className="editButton" onClick={this.editClickHandler}><FontAwesomeIcon icon={faEdit} /></button>
                            <button className="deleteButton" onClick={() => this.props.deleteUser(this.props.Key)}>X </button>
                        </div>
        } else {

            dataShown = <div>
            <form className="form-inline-edit" onSubmit={ (a) => this.updateUser(a, this.props.Key)}>
            <input
            type="text"
            className="editUserId"
            defaultValue={this.props.userid}
            ref={input => this.userID = input}
            required
            />
            <input
            type="text"
            className="editUserFirstName"
            defaultValue={this.props.firstName}
            ref={input => this.firstName = input}
            required
            />
            <input
            type="text"
            className="editUserLastName"
            defaultValue={this.props.lastName}
            ref={input => this.lastName = input}
            required
            />
            <button 
            type="submit" 
            className="appButtonSubmit">
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className="deleteButton" onClick={this.editClickHandler}>X</button>
            </form>
        </div>
        }

        return (
            <div className="userLine">
                {dataShown}
            </div>
        )
    }
}



const UserID = (props) => {
    return (
        <p className="userIdData">{props.userid}</p>
    )
}

const FirstName = (props) => {
    return (
        <p className="userData">{props.firstName}</p>
    )
}

const LastName = (props) => {
    return (
        <p className="userData">{props.lastName}</p>
    )
}


export default OneUser;