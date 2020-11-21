import React, { Component } from 'react';
import {Input, InputGroup, InputGroupAddon, Button, FormFeedback, Spinner} from 'reactstrap';
import Files from 'react-files';
import axios from 'axios';
import styles from './fileUploader.module.scss';

/**
 * @prop {[string]} types content-type like ['image/*']
 * @prop {int} fileSize (optional) default 50000000
 * @prop {string} filename (optional) force upload filename, DANGER if this file already exists in back, it will be overwrited
 * @prop {callBack(filename)} onUpload (optional) triggered when a file starts to uploading, first parameter is the filename being upladed
 * @prop {callBack(model)} onUploaded(optional) model is set to model provided by api if success, null otherwise
 * @prop {callBack} onError (optional) triggered when error occured
 * @prop {string} value (required) for edit an exist model, can be null for no
 * @prop {string} forceText (optional) force display text, usefull when edit with delete old file
 * @prop {bool} disableDelete (optional) for disable the delete button
 * TODO traduction
 */
class FileUploader extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      uploading: false,
      err: false,
    };
  }
  
  render() {
    return (
      <div className={styles.fileUploader}>
              <Files ref='files'
                onChange={this.fileChange}
                onError={this.fileErr}
                accepts={this.props.type}
                maxFiles={1}
                maxFileSize={this.props.fileSize || 1000000000}
                clickable
                ref='files'
              >
                <Button color='primary'>UPDATE_LOGO</Button>
              </Files>
          {this.state.err && <p className={styles.err}>{'Une erreur est survenue.'}</p>}
      </div>
    );
  }

  //-------------------------- methods -------------------------------//
  fileChange = (e) => {
    let data = new FormData();
    let model;

    this.setState({err: false});
    if (!e.length) {
      this.setState({
        err: 'Le fichier envoyé ne correspond pas au type demandé',
      });
      return;
    }
    this.setState({uploading: true});

    if (this.props.onUpload)
      this.props.onUpload(e[0].name);

    data.append('userId', UIStore.user.id);
    data.append('name', this.props.filename || e[0].name);
    data.append('file', e[0]);

    let promise;
    if (this.props.value) {
      promise = axios.put(API_URL + '/file/' + this.props.value.id, data)
    } else {
      promise = axios.post(API_URL + '/file', data)
    }
    promise.then((res) => {
      model = res.data;
      this.setState({file: res.data.name});
    })
    .catch((err) => {
      model = null;
      this.fileErr(err.response.statusText, e[0].name);
    })
    .finally(() => {
      this.setState({uploading: false});
      e.shift();
      if (this.props.onUploaded)
        this.props.onUploaded(model);
    })
  }

  fileErr = (err, file) => {
    this.setState({err});
  }
}

export default FileUploader;
