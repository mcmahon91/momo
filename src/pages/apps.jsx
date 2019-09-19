import React, {Component} from 'react';
import '../App.css';
import SideBar from './SideBar'
import OneApp from "../AppComponents";
import {appdatabase} from "../databases/appdatabase.js"
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';

class AppsPage extends Component {

    appDatabase = firebase.initializeApp(appdatabase);
    apps = this.appDatabase.database().ref()

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
                <div className="newApp">
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
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Image"
                        ref={input => this.image = input}/>
                        <input
                        type="text"
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="App Name"
                        ref={input => this.appName = input}/>
                        <input
                        type="text"
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Description - 300 word limit"
                        ref={input => this.description = input}/>
                        <input
                        type="text"
                        className="form-control mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Version"
                        ref={input => this.version = input}/>
                        <button 
                            type="submit" 
                            className="btn btn-primary">Submit
                        </button>
                    </form>


                </div>
                <h3 className="header">Available Apps</h3>
                    <div className="appList">
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