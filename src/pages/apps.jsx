import React, {Component} from 'react';
import '../App.css';
import SideBar from './SideBar'
import OneApp from "../AppComponents";
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import OneAppTitle from '../components/AppTitle'



class AppsPage extends Component {

    appDatabase = firebase.initializeApp(testdatabase);
    apps = this.appDatabase.database().ref().child('apps')
    prevAppKeyValue = this.appDatabase.database().ref().child('prevAppKey')
    storage = firebase.storage()
    appIcons = this.storage.ref('apps/')
    storageRef = this.storage.ref('apps/0')
    link 
    

    state = {
        "apps":[],
        "prevAppKey": 1,
        "task" : "",
        "appIcons": [],
        'url': [],
        'link': ''

    } 


    componentDidMount() {
        
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


        this.storage.ref('apps/0').getDownloadURL()
        .then((url) =>{
            this.setState({
                link: url
            })
            //this.state.link = url
        })

        this.state.apps.map((apps) => 
            this.state.appIcons.push(apps.key)
        )
    }

    populateState() {
        let i = 0
        
        for (i = 0; i < this.state.apps.length; i++){
            console.log("Key: " + this.state.apps[i].key)
            console.log("i " + i)
            this.storage.ref(`apps/${this.state.apps[i].key}`).getDownloadURL()
                .then((url) => {
                    console.log(i)
                    const newUrls = [...this.state.url, url]
                    this.setState({
                        url: newUrls
                    })
                    console.log(newUrls)
                })
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
                        <input
                        type="file"
                        required
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
                                image={this.state.url[index]}
                                appName={app.name}
                                appDescription={app.description}
                                appVersion={app.version}
                                index={app.key}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppsPage