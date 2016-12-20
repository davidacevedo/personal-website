import React, { Component } from 'react';

import example from './assets/example.jpg';

import styles from './styles.scss';

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.title}>Coming Soon</div>
        <img className={styles.example} src={example}/>
      </div>
    )
  }
}