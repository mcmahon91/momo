import React, { Component } from 'react';
import '../App.css';
import {testdatabase} from "../databases/testdatabase.js"
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap';
import firebase from 'firebase';
import {OnePhone} from '../phoneComponents.js'
import SideBar from './SideBar'
import AddDevice from '../addDevicetoggle/addDeviceToggle'




class DevicePage extends Component {

  app = firebase.initializeApp(testdatabase);

  phonesUpdated = this.app.database().ref().child('phones')
  usersUpdated = this.app.database().ref().child('users')

    
  state = {
    "phones" : [],
    "users" : [],
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
  }
  
  phonePicked = React.createRef()
  phonePickedClear = React.createRef()
  person = React.createRef()
    

  updateState = (newState) => {
    this.phonesUpdated.set(
        newState
    )
}
  
  handleSubmit = (e) => {

    e.preventDefault();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    let phoneState = this.state.phones
    let checkPhonePicked = this.phonePicked.current.value
    let accessPhonesDatabase = this.phonesUpdated
    let personPicked = this.person.current.value

    console.log(checkPhonePicked)

    let updatedState = phoneState.map(updatePhoneState)

    function updatePhoneState(phone){
      if (phone.name === checkPhonePicked){
        console.log(phone.name)
        accessPhonesDatabase.child(phone.key).set({
          "checkOutTime" : time,
          "checkedOutBy" : personPicked,
          "id" : phone.id,
          "key" : phone.key,
          "make" : phone.make,
          "model" : phone.model,
          "os" : phone.os,
          "name" : phone.name
        })
      }
    }
    e.currentTarget.reset()
  }
  
  checkIn = (e) => {
    e.preventDefault();

    let phoneState = this.state.phones
    let phoneToClear = this.phonePickedClear.current.value
    let accessPhonesDatabase = this.phonesUpdated

    let clearUser = phoneState.map(updateClearUser)

    function updateClearUser(phone){
      if (phone.name === phoneToClear){
        console.log(phone.name)
        accessPhonesDatabase.child(phone.key).set({
          "checkOutTime" : "",
          "checkedOutBy" : "Available",
          "id" : phone.id,
          "key" : phone.key,
          "make" : phone.make,
          "model" : phone.model,
          "os" : phone.os,
          "name" : phone.name
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
                  <OnePhone
                    id={"Device ID"}
                    checkedOutBy={"User"}
                    checkedOutTime={"Checkout Date"} 
                    make={"Make"}
                    model={"Model"}
                    os={"OS Version"}
                    key={"Phone Key"}
                    index={"Index"} 
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
                      key={phone.key}
                      index={index}
                    />
                  )}
                  <AddDevice updateState={this.updateState} state={this.state.phones}/>
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
                            <option>{phone.name}</option>
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
                            <option>{phone.name}</option>
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



      //{
        // if (phone.name == this.phonePicked){
        //   this.phonesUpdated.child(this.phonePicked).set({
        //     "checkOutTime" : time,
        //     "checkedOutBy" : this.person.current.value,
        //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        //     "key" : "1",
        //     "make" : "Apple",
        //     "model" : phone.child(model),
        //     "os" : "",
        //     "name" : "Apple iPhone 6"
        //   })
        // }
      
      // if(this.phonePicked.current.value === "Apple iPhone 6"){
      //   this.updateIphone6.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "1",
      //     "make" : "Apple",
      //     "model" : "iPhone 6",
      //     "os" : "",
      //     "name" : "Apple iPhone 6"
      //   })
      // } else if (this.phonePicked.current.value === "Apple iPhone 7") {
      //   this.updateIphone7.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "2",
      //     "make" : "Apple",
      //     "model" : "iPhone 7",
      //     "os" : "",
      //     "name" : "Apple iPhone 7"
      //   })
      // }else if (this.phonePicked.current.value === "Apple iPhone 8") {
      //   this.updateIphone8.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "3",
      //     "make" : "Apple",
      //     "model" : "iPhone 8",
      //     "os" : "",
      //     "name" : "Apple iPhone 8"
      //   })
      // } else if (this.phonePicked.current.value === "Apple iPhone X") {
      //   this.updateIphoneX.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "4",
      //     "make" : "Apple",
      //     "model" : "iPhone X",
      //     "os" : "",
      //     "name" : "Apple iPhone X"
      //   })
      // } else if (this.phonePicked.current.value === "Apple iPhone XS") {
      //   this.updateIphoneXS.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "5",
      //     "make" : "Apple",
      //     "model" : "iPhone XS",
      //     "os" : "",
      //     "name" : "Apple iPhone XS"
      //   })
      // } else if (this.phonePicked.current.value === "Samsung 1") {
      //   this.updateSamsung1.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "6",
      //     "make" : "Samsung",
      //     "model" : "1",
      //     "os" : "",
      //     "name" : "Samsung 1"
      //   })
      // } else if (this.phonePicked.current.value === "Samsung 2") {
      //   this.updateSamsung2.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "7",
      //     "make" : "Samsung",
      //     "model" : "2",
      //     "os" : "",
      //     "name" : "Samsung 2"
      //   })
      // } else if (this.phonePicked.current.value === "Samsung 3") {
      //   this.updateSamsung3.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "8",
      //     "make" : "Samsung",
      //     "model" : "3",
      //     "os" : "",
      //     "name" : "Samsung 3"
      //   })
      // } else if (this.phonePicked.current.value === "Samsung 4") {
      //   this.updateSamsung4.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "9",
      //     "make" : "Samsung",
      //     "model" : "4",
      //     "os" : "",
      //     "name" : "Samsung 4"
      //   })
      // } else if (this.phonePicked.current.value === "Samsung 5") {
      //   this.updateSamsung5.update({
      //     "checkOutTime" : time,
      //     "checkedOutBy" : this.person.current.value,
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "10",
      //     "make" : "Samsung",
      //     "model" : "5",
      //     "os" : "",
      //     "name" : "Samsung 5"
      //   })
      // }



      // if(this.phonePickedClear.current.value === "Apple iPhone 6"){
      //   console.log(this.phonePicked.current.value)
      //   this.updateIphone6.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : phone.id,
      //       "key" : phone.key,
      //       "make" : phone.make,
      //       "model" : phone.model,
      //       "os" : phone.os,
      //       "name" : phone.name
      //   })
      // } else if (this.phonePickedClear.current.value === "Apple iPhone 7") {
      //   this.updateIphone7.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "2",
      //       "make" : "Apple",
      //       "model" : "iPhone 7",

      //       "os" : ""
      //   })
      // }else if (this.phonePickedClear.current.value === "Apple iPhone 8") {
      //   this.updateIphone8.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "3",
      //       "make" : "Apple",
      //       "model" : "iPhone 8",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Apple iPhone X") {
      //   this.updateIphoneX.update({
      //     "checkOutTime" : "",
      //     "checkedOutBy" : "Available",
      //     "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //     "key" : "4",
      //     "make" : "Apple",
      //     "model" : "iPhone X",
      //     "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Apple iPhone XS") {
      //   this.updateIphoneXS.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "5",
      //       "make" : "Apple",
      //       "model" : "iPhone XS",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Samsung 1") {
      //   this.updateSamsung1.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "6",
      //       "make" : "Samsung",
      //       "model" : "1",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Samsung 2") {
      //   this.updateSamsung2.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "7",
      //       "make" : "Samsung",
      //       "model" : "2",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Samsung 3") {
      //   this.updateSamsung3.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "8",
      //       "make" : "Samsung",
      //       "model" : "3",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Samsung 4") {
      //   this.updateSamsung4.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "9",
      //       "make" : "Samsung",
      //       "model" : "4",
      //       "os" : ""
      //   })
      // } else if (this.phonePickedClear.current.value === "Samsung 5") {
      //   this.updateSamsung5.update({
      //       "checkOutTime" : "",
      //       "checkedOutBy" : "Available",
      //       "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
      //       "key" : "10",
      //       "make" : "Samsung",
      //       "model" : "5",
      //       "os" : ""
      //   })
      // }


          // updateIphone6 = this.app.database().ref().child('phones').child("0")
    // updateIphone7 = this.app.database().ref().child('phones').child("1")
    // updateIphone8 = this.app.database().ref().child('phones').child("2")
    // updateIphoneX = this.app.database().ref().child('phones').child("3")
    // updateIphoneXS = this.app.database().ref().child('phones').child("4")
    // updateSamsung1 = this.app.database().ref().child('phones').child("5")
    // updateSamsung2 = this.app.database().ref().child('phones').child("6")
    // updateSamsung3 = this.app.database().ref().child('phones').child("7")
    // updateSamsung4 = this.app.database().ref().child('phones').child("8")
    // updateSamsung5 = this.app.database().ref().child('phones').child("9")