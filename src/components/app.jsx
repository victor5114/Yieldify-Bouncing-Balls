import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/lib/scss/react-widgets.scss';
import React from 'react';
import CanvasBall from '../containers/canvasBall.jsx';
import ListBall from '../containers/listBall.jsx';
import SelectImageType from '../containers/selectImageType.jsx';

const App = () =>
  <div className="container-fluid">
    <div className="row">
      <p>Title</p>
    </div>
    <div className="row">
      <div className="col-md-6 col-md-offset-1">
        <CanvasBall />
      </div>
      <div className="col-md-4 col-md-offset-2">
        <div className="row">
          <div className="col-md-3">
            <SelectImageType />
          </div>
        </div>
        <div className="row">
          <ListBall />
        </div>
      </div>
    </div>
    <div className="row">
      <p>Footer</p>
    </div>
  </div>;

export default App;
