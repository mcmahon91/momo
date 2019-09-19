import React, {Component} from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AddUserForm from './addUserForm'

class AddUser extends Component {

    state = {
        addNewUserOpen: false
    }

    addUserClickHandler = () => {
        this.setState((prevState) =>{
            return {addNewUserOpen: !prevState.addNewUserOpen}
        })
        console.log("Yes")
    }

    render(){
        let addUserForm;

        if(this.state.addNewUserOpen) {
            addUserForm = <AddUserForm removeNewUserinput={this.addUserClickHandler} updateState={this.props.updateState} click={this.props.click} firstName={this.props.firstName} userID={this.props.userID} lastName={this.props.lastName} key={this.props.key} state={this.props.state}/>
        }
        return(
            <div>
                {addUserForm}
                <button className="newUser" onClick={this.addUserClickHandler}><FontAwesomeIcon icon={faPlusCircle} /> Add New</button>
            </div>            
        )
    }
}


export default AddUser