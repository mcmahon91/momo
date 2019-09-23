import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

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
                        <button className="editButton" ><FontAwesomeIcon icon={faEdit} /></button>
                        <button className="deleteButton" onClick={() => this.props.deleteDevice(this.props.index)}>X </button>
                        </div>
        } else {
            dataShown = <div>
            <button>Hi</button>
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
// export function OnePhone() {}
// export function PhoneName() {};
// export function PhoneID() {};
// export function CheckedOutBy() {};
// export function CheckOutTime() {};