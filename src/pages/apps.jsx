import React, {Component} from 'react';
import '../App.css';
import SideBar from './SideBar'
import OneApp from "../AppComponents";
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons'
import OneAppTitle from '../components/AppTitle'



class AppsPage extends Component {

    appDatabase = firebase.initializeApp(testdatabase);
    apps = this.appDatabase.database().ref().child('apps')
    prevAppKeyValue = this.appDatabase.database().ref().child('prevAppKey')
    storage = firebase.storage()
    appIcons = this.storage.ref('apps/')
    storageRef = this.storage.ref('apps/0')
    pictures = this.appDatabase.database().ref().child('pictures') 
    
    state = {
        "apps":[],
        "prevAppKey": 1,
        "task" : "",
        "appIcons": [],
        'url': [],
        'pictures': []

    } 


    componentDidMount() {
        
        this.pictures.on('value', snap =>{
            console.log(snap.val())
            this.setState({
                pictures: snap.val()
            })
        })

        this.prevAppKeyValue.on('value', snap =>{
            this.setState({
                prevAppKey: snap.val()
            })
        })

        this.apps.on('value', snap => {
            this.setState({
                apps: snap.val()
            })
            // this.populateState()
        })

        this.state.apps.map((apps) => 
            this.state.appIcons.push(apps.key)
        )


    }

    // populateState() {
    //     var pictures = []
    //     console.log(pictures)
    //     for (let i = 0; i < this.state.apps.length + 1; i++){
    //         console.log("i is : " + i)
    //         console.log("apps length is : " + this.state.apps.length)
    //         if(i < this.state.apps.length){
    //             let key = this.state.apps[i].key
    //             this.storage.ref(`apps/${this.state.apps[i].key}`).getDownloadURL().then((url) => {
    //                 let link = url
    //                 let data = {key: key.toString(), url: link}
    //                 pictures = [...pictures, data]
    //                 console.log(pictures)
    //                 this.pictures.set(
    //                     pictures
    //                 );
    //             });
    //         } else{
    //             console.log("Hello")
    //             this.pictures.set(
    //                 pictures
    //             );
    //             console.log(this.state.pictures)
    //         }
    //     }
    //     console.log(pictures)
    // }


    onChange =(e)=> {
        var file = e.target.files[0]
        var storageRef = this.storage.ref('apps/' + (this.state.prevAppKey + 1))
        var task = storageRef.put(file)
        this.setState({
            task: task
        })
    }

    onSubmit = (a) => {
        a.preventDefault();
        // const image = this.image.value;
        //const image = this.appIcons.child(this.state.prevAppKey + 1)
        const name = this.appName.value;
        const description = this.description.value;
        const version = this.version.value;
        const key = this.state.prevAppKey + 1;

        this.prevAppKeyValue.set(
            this.state.prevAppKey + 1
        )

        //const info = {key: key.toString(), description: description, image: image, name: name, version: version}
        const info = {key: key.toString(), description: description, name: name, version: version}
        
        const data = [...this.state.apps, info]
        this.apps.set(
            data
        )

        this.state.task.on('state_changed', 
            function progress(snapshot){
            },
            function error(err) {
            },
            function complete() {
            }
        )

        a.currentTarget.reset()
    }


    render() {
        for(let i = 0; i < this.state.apps.length; i++){
            console.log(this.state.pictures)
            console.log(this.state.apps[i].key)
            for(let j = 0; j < this.state.pictures.length; j++){
                if(this.state.apps[i].key == this.state.pictures[j].key){
                    this.state.apps[i].url = this.state.pictures[j].url
                    console.log(this.state.apps[i].url)
                }
            }
        }
        return (
            <div>
            <SideBar />
            <div className="appPageDiv">
                <h2 className="header">App Management</h2>
                <h3 className="header">Add New App</h3>
                <div className="newApp" style={{backgroundColor: "rgb(236,236,236)"}}>
                    <div style={{backgroundColor: "rgb(125,166,177)"}}>
                        <OneAppTitle 
                            image={"Image"}
                            appName={"Name"}
                            appDescription={"Description"}
                            appVersion={"Version"}
                        />
                    </div>
                    <form className="addAppForm" onSubmit={this.onSubmit}>

                    <label htmlFor="appUploader" className="custom-file-upload">
                            <i className="fa fa-cloud-upload">
                            {/* <FontAwesomeIcon icon={faCloudUploadAlt} /> */}
                            </i> 
                        Choose 
                        <br />
                        Image
                    </label>

                        <input
                        id="appUploader"
                        type="file"
                        required
                        //className="imageUploader"
                        // ref={input => this.image = input}
                        onChange={(e) => this.onChange(e)}
                        />



                        <input
                        type="text"
                        className="appNameBox"
                        placeholder="App Name"
                        required
                        ref={input => this.appName = input}/>
                        <input
                        type="text"
                        className="descriptionBox"
                        placeholder="Description - 300 character limit"
                        required
                        maxLength="300"
                        ref={input => this.description = input}/>
                        <input
                        type="text"
                        className="versionBox"
                        placeholder="Version"
                        ref={input => this.version = input}
                        required
                        />

                        <button 
                        type="submit" 
                        className="appButtonSubmit">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </form>


                </div>
                <h3 className="header">Available Apps</h3>
                    <div className="appList" style={{backgroundColor: "rgb(236,236,236)"}}>
                        <div style={{backgroundColor: "rgb(125,166,177)"}}>
                            <OneAppTitle 
                                image={"Image"}
                                appName={"Name"}
                                appDescription={"Description"}
                                appVersion={"Version"}
                            />
                        </div>
                        {this.state.apps.map((app, index) =>
                            <OneApp 
                                image={this.state.pictures}
                                appName={app.name}
                                appDescription={app.description}
                                appVersion={app.version}
                                key={app.key}
                                index={index}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppsPage