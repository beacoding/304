import React            from 'react';
import styles           from './style.css';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1 className={styles.header}> 304 Project </h1>
        <div className={styles.links}>
	        <div>
	        	<a href="/registration"> Registration </a>
	        	<div className={styles.description}>Look up distributions, averages, profs, and more at UBC</div>
        	</div>
        </div>
      </div>
    );
  }
}