import React, { Component } from 'react'
import Header from 'components/Header';

import styles from './styles.scss';

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Header/>
      </div>
    )
  }
}