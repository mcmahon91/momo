import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'

class OnePhone extends Component {

    state={
        devices: this.props.deviceState,
        editData: false
    }

    editClickHandler = () => {
        this.setState((prevState) => {
            return{editData: !prevState.editData}
        })
    }

    updateDevice = (a, index) => {
        a.preventDefault();
        console.log(this.props.index)
        console.log("KEY " + index)
        const deviceID = this.deviceID.value
        const make = this.make.value
        const model = this.model.value
        const os = this.osVersion.value
        const updatedDeviceInfo = {key: index, id: deviceID, make: make, model: model, os: os, checkOutTime: this.props.checkOutTime, checkedOutBy: this.props.checkedOutBy, name: this.props.name}
        
        this.props.updateDeviceInDatabase(updatedDeviceInfo, index)
        this.editClickHandler()

    }


    render(){

        let dataShown;

        if(!this.state.editData){
            dataShown = <div className="line">
                        <PhoneID phoneid={this.props.id}/>
                        <CheckedOutBy checkedOutBy={this.props.checkedOutBy}/>
                        <CheckOutTime checkedOutTime={this.props.checkedOutTime}/>
                        <PhoneMake phoneMake={this.props.make}/>
                        <PhoneModel phoneModel={this.props.model} />
                        <OsVersion osVersion={this.props.os} />
                        <button className="editButton" onClick={this.editClickHandler}><FontAwesomeIcon icon={faEdit} /></button>
                        <button className="deleteButton" onClick={() => this.props.deleteDevice(this.props.index)}>X </button>
                        </div>
        } else {
            dataShown = <div>
            <form className="form-inline line" onSubmit={(a) => this.updateDevice(a, this.props.index)}>
                <input
                type="text"
                className="deviceIdBox"
                placeholder="Device ID"
                defaultValue={this.props.id}
                ref={input => this.deviceID = input}
                required
                />
                <input
                type="text"
                className="makeBox"
                defaultValue={this.props.make}
                ref={input => this.make = input}
                required
                />
                <input
                type="text"
                className="modelBox"
                defaultValue={this.props.model}
                ref={input => this.model = input}
                required
                />
                <input
                type="text"
                className="osVersionBox"
                defaultValue={this.props.os}
                ref={input => this.osVersion = input}
                required
                />
                <button 
                type="submit" 
                className="devicebuttonSubmit">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button className="deleteButtonOnEdit" onClick={this.editClickHandler}>X</button>
            </form>
        </div>
        }





        return (
            <div>
                {dataShown}
            </div>
        )
    }
}

const PhoneMake = (props) => {
    return (
        <p className="phoneMake">{props.phoneMake}</p>
    )
}

const PhoneModel = (props) => {
    return (
        <p className="phoneModel">{props.phoneModel}</p>
    )
}

const PhoneID = (props) => {
    return (

        <p className="phoneID">{props.phoneid}</p>

    )
}

const CheckedOutBy = (props) => {
    return (
        <p className="checkedOutBy">{props.checkedOutBy} </p>
    )
}

const CheckOutTime = (props) => {
    return (
        <p className="checkOutTime">{props.checkedOutTime}</p>
    )
}

const OsVersion = (props) => {
    return (
        <p className="osVersion">{props.osVersion}</p>
    )
}

export default OnePhone