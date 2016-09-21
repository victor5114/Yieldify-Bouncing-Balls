import React from 'react';

// Images
import nodejs from '../static/img/Techno/node.png';
import react from '../static/img/Techno/react-hexagon.png';
import bootstrap from '../static/img/Techno/bootstrap.png';
import babel from '../static/img/Techno/babel.png';
import github from '../static/img/Techno/github.png';
import webpack from '../static/img/Techno/webpack.png';
import heroku from '../static/img/Techno/heroku.png';

import styles from '../index.scss';

const PreFooter = () =>
  <div className={styles['pre-footer']}>
    <img alt="webpack" src={webpack} width="150" height="150" />
    <img alt="reactjs" src={react} width="150" height="150" />
    <img alt="babel" src={babel} width="150" height="150" />
    <img alt="bootstrap" src={bootstrap} width="150" height="150" />
    <img alt="github" src={github} width="150" height="150" />
    <img alt="nodejs" src={nodejs} width="150" height="150" />
    <img alt="heroku" src={heroku} width="150" height="150" />
  </div>;

export default PreFooter;
