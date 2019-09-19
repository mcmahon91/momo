import React from 'react'

const OneUser = (props) => {
    return (
        <div className="userLine">
            <UserID userid={props.userid}/>
            <FirstName firstName={props.firstName} />
            <LastName lastName={props.lastName} />
        </div>
    )
}



const UserID = (props) => {
    return (
        <p className="userData">{props.userid}</p>
    )
}

const FirstName = (props) => {
    return (
        <p className="userData">{props.firstName}</p>
    )
}

const LastName = (props) => {
    return (
        <p className="userData">{props.lastName}</p>
    )
}


export default OneUser;