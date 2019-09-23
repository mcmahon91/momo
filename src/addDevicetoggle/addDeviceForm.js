import React, {Component} from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


class AddDeviceForm extends Component {

    state = this.props.state

    onSubmit = (a) => {
        a.preventDefault();
        console.log("Key " + this.props.prevDeviceKey)
        const deviceId = this.deviceID.value;
        const user = "Available";
        const checkoutDate = "";
        const make = this.make.value;
        const model = this.model.value;
        const osVersion = this.osVersion.value;
        const key = this.props.prevDeviceKey + 1;
        console.log(this.state)
        const info = {key: key.toString(), id: deviceId, checkedOutBy: user, checkOutTime:checkoutDate, make: make, model: model, os: osVersion, name: `${make} ${model}`}

        const data = [...this.state, info]
        console.log(info)
        console.log(data)
        this.props.updateState(data)
        this.props.removeNewDeviceInput()
        a.currentTarget.reset()
    }


    render() {
        return(
            <div>
                <form className="form-inline line" onSubmit={this.onSubmit}>
                    <input
                    type="text"
                    className="deviceIdBox"
                    placeholder="Device ID"
                    ref={input => this.deviceID = input}
                    required
                    />
                    <input
                    type="text"
                    className="makeBox"
                    placeholder="Make"
                    ref={input => this.make = input}
                    required
                    />
                    <input
                    type="text"
                    className="modelBox"
                    placeholder="Model"
                    ref={input => this.model = input}
                    required
                    />
                    <input
                    type="text"
                    className="osVersionBox"
                    placeholder="OS Version"
                    ref={input => this.osVersion = input}
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

export default AddDeviceForm