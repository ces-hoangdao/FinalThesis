import React from 'react';

import styles from './Toolbar.module.css';

const Toolbar = (props) => (
  <>
    <header className={styles.header}>
      <h1 className={styles.NotLogo}>Master Travel</h1>
      <nav>
        <ul>
          <li><a href='#'>Home</a></li>
          <li><a href='#'>About</a></li>
          <li><a href='#'>Blog</a></li>
          <li><a href='#'>Contact</a></li>
        </ul>
      </nav>
    </header>
  </>
);

export default Toolbar;
