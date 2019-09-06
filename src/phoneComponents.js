import React from 'react';

export const OnePhone = (props) => {
    return (
        <div className="line">
            <PhoneName phoneName={props.name}/>
            <PhoneID phoneid={props.id}/>
            <CheckedOutBy checkedOutBy={props.checkedOutBy}/>
            <CheckOutTime checkedOutTime={props.checkedOutTime}/>
        </div>
    )
}

export const PhoneName = (props) => {
    return (
        <p className="phoneName">{props.phoneName}</p>
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


// export function OnePhone() {}
// export function PhoneName() {};
// export function PhoneID() {};
// export function CheckedOutBy() {};
// export function CheckOutTime() {};