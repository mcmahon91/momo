import React, { Component } from 'react';
import { storage } from 'firebase';
import FileUploader from 'react-firebase-file-uploader'
import axios, {post} from 'axios'
import {testdatabase} from "../databases/testdatabase.js"
import firebase from 'firebase';

class ImageUpload extends Component {
    state = {
        image: '',
        imageURL: '',
        progress: 0
    }

    onChange =(e)=> {
        var file = e.target.files[0]
        var storageRef = this.props.storage.ref('sweet_gifs/' + file.name)
        var task = storageRef.put(file)

        // task.on('state_changed', 
        // function progress(snapshot){
        //     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //     uploader.value = percentage
        // },
        
        // function error(err) {

        // },

        // function complete() {

        // }
        //)
    }


    render(){
        // console.log(this.state)
        return(
            <div>
            {/* <FileUploader 
                accept="image/*"
                name='image'
                storageRef={firebase.storage().ref('apps')}
                onUploadStart={this.handleUploadStart}
                onUploadSuccess={this.handleUploadSuccess}
            /> */}
            {/* <form onSubmit={this.fileUploadHandler}>
                {/* <input type="file" onChange={this.fileSelectedHandler}/> 
                {/* <button onClick={this.fileUploadHandler}>Upload</button> 
            </form> */}

                <input type="file" onChange={(e) => this.onChange(e)} />
            </div>
        )
    }
}

export default ImageUpload