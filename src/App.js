import React, { Component } from 'react';
import './App.css';
import {testdatabase} from "./firebase.js"
import Form from 'react-bootstrap/Form'
import { Col } from 'react-bootstrap';
import firebase from 'firebase';

class App extends Component {

  app = firebase.initializeApp(testdatabase);


  speedValue = this.app.database().ref().child('speed')
  phonesUpdated = this.app.database().ref().child('phones')
  usersUpdated = this.app.database().ref().child('users')
  updatespeed = this.app.database().ref()
  updateIphone6 = this.app.database().ref().child('phones').child("0")
  updateIphone7 = this.app.database().ref().child('phones').child("1")
  updateIphone8 = this.app.database().ref().child('phones').child("2")
  updateIphoneX = this.app.database().ref().child('phones').child("3")
  updateIphoneXS = this.app.database().ref().child('phones').child("4")
  updateSamsung1 = this.app.database().ref().child('phones').child("5")
  updateSamsung2 = this.app.database().ref().child('phones').child("6")
  updateSamsung3 = this.app.database().ref().child('phones').child("7")
  updateSamsung4 = this.app.database().ref().child('phones').child("8")
  updateSamsung5 = this.app.database().ref().child('phones').child("9")
  

  state = {

    "phones" : [
      ],

    users: [
    ],

  }

  componentDidMount() {
    this.speedValue.on('value', snap => {
      this.setState({
        speed: snap.val(),
      })
    })

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
  

  handleSubmit = (e) => {
    e.preventDefault();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    
    if(this.phonePicked.current.value === "iPhone 6"){
      console.log(this.phonePicked.current.value)
      this.updateIphone6.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "1",
        "name" : "iPhone 6"
      })
    } else if (this.phonePicked.current.value === "iPhone 7") {
      this.updateIphone7.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "2",
        "name" : "iPhone 7"
      })
    }else if (this.phonePicked.current.value === "iPhone 8") {
      this.updateIphone8.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "3",
        "name" : "iPhone 8"
      })
    } else if (this.phonePicked.current.value === "iPhone X") {
      this.updateIphoneX.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "4",
        "name" : "iPhone X"
      })
    } else if (this.phonePicked.current.value === "iPhone XS") {
      this.updateIphoneXS.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "5",
        "name" : "iPhone XS"
      })
    } else if (this.phonePicked.current.value === "samsung 1") {
      this.updateSamsung1.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "6",
        "name" : "samsung 1"
      })
    } else if (this.phonePicked.current.value === "samsung 2") {
      this.updateSamsung2.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "7",
        "name" : "samsung 2"
      })
    } else if (this.phonePicked.current.value === "samsung 3") {
      this.updateSamsung3.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "8",
        "name" : "samsung 3"
      })
    } else if (this.phonePicked.current.value === "samsung 4") {
      this.updateSamsung4.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "9",
        "name" : "samsung 4"
      })
    } else if (this.phonePicked.current.value === "samsung 5") {
      this.updateSamsung5.update({
        "checkOutTime" : time,
        "checkedOutBy" : this.person.current.value,
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "10",
        "name" : "samsung 5"
      })
    }
    e.currentTarget.reset()
  }


  checkIn = (e) => {
    e.preventDefault();
    if(this.phonePickedClear.current.value === "iPhone 6"){
      console.log(this.phonePicked.current.value)
      this.updateIphone6.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "1",
        "name" : "iPhone 6"
      })
    } else if (this.phonePickedClear.current.value === "iPhone 7") {
      this.updateIphone7.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "2",
        "name" : "iPhone 7"
      })
    }else if (this.phonePickedClear.current.value === "iPhone 8") {
      this.updateIphone8.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "3",
        "name" : "iPhone 8"
      })
    } else if (this.phonePickedClear.current.value === "iPhone X") {
      this.updateIphoneX.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "4",
        "name" : "iPhone X"
      })
    } else if (this.phonePickedClear.current.value === "iPhone XS") {
      this.updateIphoneXS.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "5",
        "name" : "iPhone XS"
      })
    } else if (this.phonePickedClear.current.value === "samsung 1") {
      this.updateSamsung1.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "6",
        "name" : "samsung 1"
      })
    } else if (this.phonePickedClear.current.value === "samsung 2") {
      this.updateSamsung2.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "7",
        "name" : "samsung 2"
      })
    } else if (this.phonePickedClear.current.value === "samsung 3") {
      this.updateSamsung3.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "8",
        "name" : "samsung 3"
      })
    } else if (this.phonePickedClear.current.value === "samsung 4") {
      this.updateSamsung4.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "9",
        "name" : "samsung 4"
      })
    } else if (this.phonePickedClear.current.value === "samsung 5") {
      this.updateSamsung5.update({
        "checkOutTime" : "",
        "checkedOutBy" : "",
        "id" : "sdgbf-savwsefv-wevvewv-wevwvwe",
        "key" : "10",
        "name" : "samsung 5"
      })
    }
    // e.currentTarget.reset()
  }

  render() {
    return (
      
      <div className="App">
        <div className="phoneList">
          <OnePhone 
            name={"Model"}
            id={"Phone ID"}
            key={"Phone Key"}
            checkedOutBy={"Checked Out"}
            checkedOutTime={"Time"} 
            index={"Index"}
            />
          {this.state.phones.map((phone, index) =>
            <OnePhone
              name={phone.name}
              id={phone.id}
              key={phone.key}
              checkedOutBy={phone.checkedOutBy}
              checkedOutTime={phone.checkOutTime}
              index={index}
            />
          )}
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
                    <option>{user.name}</option>
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
    );
  }
}

const OnePhone = (props) => {
  return (
    <div className="line">
      <PhoneName phoneName={props.name}/>
      <PhoneID phoneid={props.id}/>
      <CheckedOutBy checkedOutBy={props.checkedOutBy}/>
      <CheckOutTime checkedOutTime={props.checkedOutTime}/>
    </div>
  )
}

const PhoneName = (props) => {
  return (
      <p className="phoneName">{props.phoneName}</p>
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



// const CheckOutBar= (props) => {

//   handleSubmit(event){
//     event.preventDefault();
//   }; 

//   return (

//     <div className="checkOutBar">
//     <p>Check Out:</p>
//     <form onSubmit={this.handleSubmit()}>
//     {/* <form> */}
//       <Form.Row>
//         <Form.Group as={Col} controlId="formGridCity">
//         <Form.Label>Phone</Form.Label>
//         <Form.Control as="select">
//             <option>Choose...</option>
//             {props.phones.map((phone, index) =>
//               <option>{phone.name}</option>
//         )}
//         </Form.Control>
//         </Form.Group>

//         <Form.Group as={Col} controlId="formGridState">
//           <Form.Label>User:</Form.Label>
//           <Form.Control as="select">
//             <option>Choose...</option>
//             {props.users.map((user, index) =>
//               <option>{user.name}</option>
//         )}
//           </Form.Control>
//         </Form.Group>
//       </Form.Row>
//       <button type="submit" class="btn btn-primary">Check Out</button>
//     </form>
//   </div>
//   )
// }

export default App;
