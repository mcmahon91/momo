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

    appDatabase = !firebase.apps.length ? firebase.initializeApp(testdatabase) : firebase.app()
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
        console.log(this.state.pictures)
        // this.pictures.on('value', snap =>{
        //     console.log(snap.val())
        //     this.setState({
        //         pictures: snap.val()
        //     })
        // })

        this.prevAppKeyValue.on('value', snap =>{
            this.setState({
                prevAppKey: snap.val()
            })
        })

        this.apps.on('value', snap => {
            this.setState({
                apps: snap.val()
            })
            this.populateState()
        })

        this.state.apps.map((apps) => 
            this.state.appIcons.push(apps.key)
        )


    }

    populateState() {
        var pictures = []
        for (let i = 0; i < this.state.apps.length + 1; i++){
            if(i < this.state.apps.length){
                let key = this.state.apps[i].key
                this.storage.ref(`apps/${this.state.apps[i].key}`).getDownloadURL().then((url) => {
                    let link = url
                    let data = {key: key.toString(), url: link}
                    pictures = [...pictures, data]
                    this.pictures.set(
                        pictures
                    );
                });
            }
            setTimeout(settingState => {
                this.pictures.set(
                    pictures
                );
                this.setState({
                pictures: pictures
                })


            }, 2000)

            setTimeout( setURL => {
                for(let i = 0; i < this.state.apps.length; i++){
                    for(let j = 0; j < this.state.pictures.length; j++){
                        if(this.state.apps[i].key == this.state.pictures[j].key){
                            this.state.apps[i].url = this.state.pictures[j].url
                            console.log('hello')
                        }
                    }
                }
                this.apps.set(
                    this.state.apps
                )
            }, 4000)
        
        }
    }


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
        const name = this.appName.value;
        const description = this.description.value;
        const version = this.version.value;
        const key = this.state.prevAppKey + 1;

        this.prevAppKeyValue.set(
            this.state.prevAppKey + 1
        )

        const info = {key: key.toString(), description: description, name: name, version: version, url: ""}
        
        const data = [...this.state.apps, info]
        this.apps.set(
            data
        )
            console.log('onsubmit')
        this.state.task.on('state_changed', 
            function progress(snapshot){   
                console.log('progress')
            },
            function error(err) {
                console.log('error')
            },
            complete => { 
                console.log('complete')
                this.populateState()
                console.log(this.state.pictures)
            }
            )
        this.populateState()
        a.currentTarget.reset()
    }


    render() {
        for(let i = 0; i < this.state.apps.length; i++){
            for(let j = 0; j < this.state.pictures.length; j++){
                if(this.state.apps[i].key == this.state.pictures[j].key){
                    this.state.apps[i].url = this.state.pictures[j].url
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
                                image={app.url}
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