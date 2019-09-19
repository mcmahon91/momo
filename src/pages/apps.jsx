import React, {Component} from 'react';
import '../App.css';
import SideBar from './SideBar'
import OneApp from "../AppComponents";
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


class AppsPage extends Component {

    appDatabase = firebase.initializeApp(testdatabase);
    apps = this.appDatabase.database().ref().child('apps')

    state = {
        "apps":[]
    }

    componentDidMount() {

        this.apps.on('value', snap => {
            this.setState({
                apps: snap.val()
            })
        })
    }

    onSubmit = (a) => {
        a.preventDefault();
        const image = this.image.value;
        const name = this.appName.value;
        const description = this.description.value;
        const version = this.version.value;
        const key = this.state.apps.length;

        const info = {key: key.toString(), description: description, image: image, name: name, version: version}
        const data = [...this.state.apps, info]
        this.apps.set(
            data
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
                        <OneApp 
                            image={"Image"}
                            appName={"Name"}
                            appDescription={"Description"}
                            appVersion={"Version"}
                        />
                    </div>
                    <form className="form-inline" onSubmit={this.onSubmit}>
                        <input
                        type="text"
                        className="imageBox"
                        placeholder=""
                        ref={input => this.image = input}/>
                        <input
                        type="text"
                        className="appNameBox"
                        placeholder="App Name"
                        ref={input => this.appName = input}/>
                        <input
                        type="text"
                        className="descriptionBox"
                        placeholder="Description - 300 word limit"
                        ref={input => this.description = input}/>
                        <input
                        type="text"
                        className="versionBox"
                        placeholder="Version"
                        ref={input => this.version = input}/>
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
                            <OneApp 
                                image={"Image"}
                                appName={"Name"}
                                appDescription={"Description"}
                                appVersion={"Version"}
                            />
                        </div>
                        {this.state.apps.map((app, index) =>
                            <OneApp 
                                image={app.image}
                                appName={app.name}
                                appDescription={app.description}
                                appVersion={app.version}
                                key={app.key}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default AppsPage