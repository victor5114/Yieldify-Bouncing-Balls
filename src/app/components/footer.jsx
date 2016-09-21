import React from 'react';
import heart from '../../static/img/Techno/heart.png';

const Footer = () =>
  <div className="footer">
    <p>
      Made with
      <span>
        <img
          alt="heart"
          src={heart}
          width="12"
          height="12"
          id="heart"
        />
      </span>
      by Victor Pongnian for Yieldify
    </p>
  </div>;

export default Footer;
