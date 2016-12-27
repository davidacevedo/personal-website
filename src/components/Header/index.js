import React, { Component } from 'react';

import profilePic from './assets/profile.jpg';

import styles from './styles.scss';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <img src={profilePic}/>
        </div>
        <div className={styles.description}>
          <i className={styles.test} /> </div>
      </div>
    );
  }
}