import React from 'react';
import { placeholder } from '@babel/types';

const OnePhoneTitle = (props) => {
    return (
        <div className="line">
            <PhoneID phoneid={props.id}/>
            <CheckedOutBy checkedOutBy={props.checkedOutBy}/>
            <CheckOutTime checkedOutTime={props.checkedOutTime}/>
            <PhoneMake phoneMake={props.make}/>
            <PhoneModel phoneModel={props.model} />
            <OsVersion osVersion={props.os} />
            <Placeholder />
        </div>
    )
}

export default OnePhoneTitle

const PhoneMake = (props) => {
    return (
        <p className="phoneMake">{props.phoneMake}</p>
    )
}

const PhoneModel = (props) => {
    return (
        <p className="phoneModel">{props.phoneModel}</p>
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

const OsVersion = (props) => {
    return (
        <p className="osVersion">{props.osVersion}</p>
    )
}

const Placeholder = () => {
    return (
        <p className="devicePlaceholder">{}</p>
    )
}