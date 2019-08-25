// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import routes from '../routes';
import styles from './Home.css';

const path = require("path");


type Props = {
  sendReadDirRequest: (string) => void
};

type State = {
  selectedPath: string
};

export default class Home extends Component<Props,State> {
  props: Props;

  state: State = {
    selectedPath : path.resolve(__dirname)
  }

  onClick = ()=>{
    const { sendReadDirRequest } = this.props;
    sendReadDirRequest(this.state.selectedPath);
  }

  selectFolder = (event)=>{
    const theFiles = event.target.files;
    this.setState({selectedPath:theFiles[0].path});
}

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <input type="file" id="FileUpload" onChange={this.selectFolder} webkitdirectory="true" directory="true" />
        <Button type="primary" onClick={this.onClick}>
          Primary
        </Button>
      </div>
    );
  }
}
