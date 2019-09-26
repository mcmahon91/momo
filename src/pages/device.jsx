import React, { Component } from 'react';
import '../App.css';
import {testdatabase} from "../databases/testdatabase.js";
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import firebase from 'firebase';
import OnePhone from '../phoneComponents.js';
import OnePhoneTitle from '../phoneTitle';
import SideBar from './SideBar';
import AddDevice from '../addDevicetoggle/addDeviceToggle';


class DevicePage extends Component {

  app = firebase.initializeApp(testdatabase);
  phonesUpdated = this.app.database().ref().child('phones')
  usersUpdated = this.app.database().ref().child('users')
  prevDeviceKeyValue = this.app.database().ref().child('prevDeviceKey')

    
  state = {
    "phones" : [],
    "users" : [],
    "prevDeviceKey" : 0
  }
  
  componentDidMount() {
  
    this.phonesUpdated.on('value', snap =>{
      this.setState({
        phones: snap.val()
      })
    })
  
    this.usersUpdated.on('value', snap =>{
      this.setState({
        users: snap.val()
      })
    })

    this.prevDeviceKeyValue.on('value', snap =>{
      this.setState({
        prevDeviceKey: snap.val()
      })
    })
  }
  
  phonePicked = React.createRef()
  phonePickedClear = React.createRef()
  person = React.createRef()
    

  updateState = (newState) => {
    this.phonesUpdated.set(
        newState
    )

    this.state.prevDeviceKey = parseInt(this.state.prevDeviceKey) + 1
    this.prevDeviceKeyValue.set(
      this.state.prevDeviceKey
    )
}
  
  handleSubmit = (e) => {
    e.preventDefault();
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var minutes = (today.getMinutes() < 10? '0' : '') + today.getMinutes();
    var time = today.getHours() + ":" + minutes
    var dateTime = date+' '+time;

    let phoneState = this.state.phones
    let checkPhonePicked = this.phonePicked.current.value
    let personPicked = this.person.current.value

    console.log(checkPhonePicked)

      let i = 0

      for (i = 0; i < phoneState.length; i++){
        if(phoneState[i].model === checkPhonePicked){
          this.phonesUpdated.child(i).set({
            "checkOutTime" : dateTime,
            "checkedOutBy" : personPicked,
            "id" : phoneState[i].id,
            "key" : phoneState[i].key,
            "make" : phoneState[i].make,
            "model" : phoneState[i].model,
            "os" : phoneState[i].os,
            "name" : phoneState[i].name
          })
        }
      }
    e.currentTarget.reset()
  }

  
  checkIn = (e) => {
    e.preventDefault();
    let phoneState = this.state.phones
    let phoneToClear = this.phonePickedClear.current.value
    let i = 0

      for (i = 0; i < phoneState.length; i++){
        if(phoneState[i].model === phoneToClear){
          this.phonesUpdated.child(i).set({
            "checkOutTime" : "",
            "checkedOutBy" : "Available",
            "id" : phoneState[i].id,
            "key" : phoneState[i].key,
            "make" : phoneState[i].make,
            "model" : phoneState[i].model,
            "os" : phoneState[i].os,
            "name" : phoneState[i].name
          })
        }
      }
  }

  deleteDevice = (key) => {
    console.log(key)
    console.log(this.state.phones)
    let listOfDevices = this.state.phones
    this.phonesUpdated.set(
      listOfDevices.filter(device => device.key !== key)
    )
  }

  updateDeviceInDatabase = (updatedDeviceInfo, key) => {
    console.log(key)
    let devices = this.state.phones
    let i = 0
    for(i = 0; i < devices.length; i++) {
      if(devices[i].key === key){
        this.phonesUpdated.child(i).set({
          "checkOutTime" : updatedDeviceInfo.checkOutTime,
          "checkedOutBy" : updatedDeviceInfo.checkedOutBy,
          "id" : updatedDeviceInfo.id,
          "key" : updatedDeviceInfo.key,
          "make" : updatedDeviceInfo.make,
          "model" : updatedDeviceInfo.model,
          "os" : updatedDeviceInfo.os,
          "name" : updatedDeviceInfo.name
        })
      }
    }
    
  }
  
  render() {
    return (
      <div>
          <SideBar />
          <div className="devicePageDiv">
            <h3 className="header">Devices</h3>
            <div className="PhoneListAndOptions">
              <div className="phoneList">
                <div style={{backgroundColor: "rgb(125,166,177)"}}>
                  <OnePhoneTitle
                    id={"Device ID"}
                    checkedOutBy={"User"}
                    checkedOutTime={"Checkout Date"} 
                    make={"Make"}
                    model={"Model"}
                    os={"OS Version"}
                    key={"Phone Key"}
                    index={"Index"}
                    deleteDevice={this.deleteDevice}
                  />
                </div>
                  {this.state.phones.map((phone, index) =>
                    
                    <OnePhone
                      id={phone.id}
                      checkedOutBy={phone.checkedOutBy}
                      checkedOutTime={phone.checkOutTime}
                      make={phone.make}
                      model={phone.model}
                      os={phone.os}
                      index={phone.key}
                      deleteDevice={this.deleteDevice}
                      key={phone.key}
                      name={phone.name}
                      updateDeviceInDatabase={this.updateDeviceInDatabase}
                    />
                  )}
                  <AddDevice updateState={this.updateState} state={this.state.phones} prevDeviceKey={this.state.prevDeviceKey}/>
                </div>
                <div className="checkOutBar">
                  <p>Check Out:</p>
                  <form onSubmit={this.handleSubmit}>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control as="select" ref={this.phonePicked}>
                          <option>Choose...</option>
                          {this.state.phones.map((phone, index) =>
                            <option>{phone.model}</option>
                          )}
                        </Form.Control>
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>User:</Form.Label>
                        <Form.Control as="select" ref={this.person}>
                          <option>Choose...</option>
                          {this.state.users.map((user, index) =>
                            <option>{user.firstName}</option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <button type="submit" name="checkOut" className="btn btn-primary" value="checkOut">Check Out</button>
                    <br/>
                    <p>Check In:</p>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Control as="select" ref={this.phonePickedClear}>
                          <option>Choose...</option>
                          {this.state.phones.map((phone, index) =>
                            <option>{phone.model}</option>
                          )}
                        </Form.Control>
                      </Form.Group>
                    </Form.Row>
                    <button type="submit" name="checkIn" className="btn btn-primary" onClick={this.checkIn.bind(this)}>Check In</button>
                  </form>
                </div>
              </div>
            </div>
        </div>  
      );
    }
  }

export default DevicePage