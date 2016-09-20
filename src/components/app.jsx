import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/lib/scss/react-widgets.scss';
import React from 'react';
import CanvasBall from '../containers/canvasBall.jsx';
import ListBall from '../containers/listBall.jsx';
import SelectImageType from '../containers/selectImageType.jsx';

import styles from '../index.scss';

const App = () =>
  <div className="container-fluid">
    <div className="page-header">
      <h1>Bouncing Balls Project</h1>
    </div>
    <div className="row">
      <div
        className={
        `${styles['equal-height-lg']} 
        ${styles['equal-height']}
        ${styles['equal-height-sm']}`}
      >
        <div className="col-md-2 col-sm-3 col-xs-4">
          <SelectImageType />
          <ListBall />
        </div>
        <div className="col-md-8 col-sm-9 col-xs-8">
          <CanvasBall />
        </div>
      </div>
    </div>
    <div className="row">
      <p>Footer</p>
    </div>
  </div>;

export default App;
