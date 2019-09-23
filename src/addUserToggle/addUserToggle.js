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
    }

    render(){
        let addUserForm;
        if(this.state.addNewUserOpen) {
            addUserForm = <AddUserForm removeNewUserinput={this.addUserClickHandler} updateState={this.props.updateState}  state={this.props.state} prevUserKey={this.props.prevUserKey}/>
        }

        return(
            <div>
                {addUserForm}
                <div className="alignButton">
                    <button className="newUser" onClick={this.addUserClickHandler}><FontAwesomeIcon icon={faPlusCircle} /> Add New</button>
                </div>
            </div>            
        )
    }
}


export default AddUser