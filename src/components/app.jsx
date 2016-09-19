import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import CanvasBall from '../containers/canvasBall.jsx';
import ListBall from '../containers/listBall.jsx';

const App = () =>
  <div className="container-fluid">
    <div className="row">
      <p>Title</p>
    </div>
    <div className="row">
      <div className="col-md-5 col-md-offset-1">
        <CanvasBall />;
      </div>
      <div className="col-md-3 col-md-offset-2">
        <ListBall />;
      </div>
    </div>
    <div className="row">
      <p>Footer</p>
    </div>
  </div>;

export default App;
