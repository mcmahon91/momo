import React from 'react';

export const OnePhone = (props) => {
    return (
        <div className="line">
            <PhoneID phoneid={props.id}/>
            <CheckedOutBy checkedOutBy={props.checkedOutBy}/>
            <CheckOutTime checkedOutTime={props.checkedOutTime}/>
            <PhoneMake phoneMake={props.make}/>
            <PhoneModel phoneModel={props.model} />
            <OsVersion osVersion={props.os} />
        </div>
    )
}

export const PhoneMake = (props) => {
    return (
        <p className="phoneMake">{props.phoneMake}</p>
    )
}

export const PhoneModel = (props) => {
    return (
        <p className="phoneModel">{props.phoneModel}</p>
    )
}

export const PhoneID = (props) => {
    return (

        <p className="phoneID">{props.phoneid}</p>

    )
}

export const CheckedOutBy = (props) => {
    return (
        <p className="checkedOutBy">{props.checkedOutBy} </p>
    )
}

export const CheckOutTime = (props) => {
    return (
        <p className="checkOutTime">{props.checkedOutTime}</p>
    )
}

export const OsVersion = (props) => {
    return (
        <p className="osVersion">{props.osVersion}</p>
    )
}


// export function OnePhone() {}
// export function PhoneName() {};
// export function PhoneID() {};
// export function CheckedOutBy() {};
// export function CheckOutTime() {};