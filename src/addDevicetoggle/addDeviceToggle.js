import React, {Component} from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import AddDeviceForm from './addDeviceForm'

class AddDevice extends Component {
    state ={
        addNewDeviceOpen: false
    }

    addDeviceClickHandler = () => {
        this.setState((prevState) => {
            return{addNewDeviceOpen: !prevState.addNewDeviceOpen}
        })
    }

    render(){
        let addDeviceForm;

        if(this.state.addNewDeviceOpen) {
            addDeviceForm = <AddDeviceForm removeNewDeviceInput={this.addDeviceClickHandler} updateState={this.props.updateState} state={this.props.state} prevDeviceKey={this.props.prevDeviceKey}/>
        }
        return (
            <div>
                {addDeviceForm}
                <div className="alignbutton">
                    <button className="newUser" onClick={this.addDeviceClickHandler}><FontAwesomeIcon icon={faPlusCircle} /> Add New</button>
                </div>
            </div>
        )
    }
}

export default AddDevice