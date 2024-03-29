import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/lib/scss/react-widgets.scss';

import React from 'react';

// Containers. Statefull (Contains some logic)
import CanvasBall from '../containers/canvasBall.jsx';
import ListBall from '../containers/listBall.jsx';
import SelectImageType from '../containers/selectImageType.jsx';

// Components. Stateless (No logic contained)
import PreFooter from './preFooter';
import Footer from './footer';

// Custom css
import '../../index.scss';

const App = () =>
  <div>
    <div className="container">
      <div className="container-fluid">
        <div className="page-header">
          <h1>Bouncing Balls Project</h1>
        </div>
        <div className="row">
          <div className="equal-height-lg equal-height equal-height-sm">
            <div className="col-md-3 col-sm-3 col-xs-4">
              <SelectImageType />
              <ListBall />
            </div>
            <div className="col-md-8 col-sm-9 col-xs-8">
              <CanvasBall />
            </div>
          </div>
        </div>
      </div>
    </div>
    <PreFooter />
    <Footer />
  </div>;

export default App;
