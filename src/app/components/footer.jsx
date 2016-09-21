import React from 'react';
import styles from '../../index.scss';
import heart from '../../static/img/Techno/heart.png';

const Footer = () =>
  <div className={styles.footer}>
    <p>
      Made with
      <span>
        <img
          alt="heart"
          src={heart}
          width="12"
          height="12"
          id={styles.heart}
        />
      </span>
      by Victor Pongnian for Yieldify
    </p>
  </div>;

export default Footer;
