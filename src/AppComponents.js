import React from 'react';

const OneApp = (props) => {
    return (
        <div className="appLine">
            <AppImage image={props.image}/>
            <AppName appName={props.appName} />
            <AppDescription appDescription={props.appDescription} />
            <AppVersion appVersion={props.appVersion} />
        </div>
    )
}



const AppImage = (props) => {
    return (
        <img className="appImage" src={props.image} style={{width: "50px", height: "50px"}}/>
    )
}

const AppName = (props) => {
    return (
        <p className="appName">{props.appName}</p>
    )
}

const AppDescription = (props) => {
    return (
        <p className="appDescription">{props.appDescription}</p>
    )
}

const AppVersion = (props) => {
    return (
        <p className="appVersion">{props.appVersion}</p>
    )
}


export default OneApp;