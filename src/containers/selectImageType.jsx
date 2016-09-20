import React, { Component, PropTypes } from 'react';
import Dropdownlist from 'react-widgets/lib/DropdownList';
import { connect } from 'react-redux';
import { changeImageType } from '../actions/index';
import { listImageType } from '../Ball/ImageManager';

class selectImageType extends Component {
  static propTypes = {
    imageType: PropTypes.string.isRequired,
    changeImageType: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="dropdown">
        <Dropdownlist
          value={this.props.imageType}
          data={listImageType}
          onChange={value => this.props.changeImageType(value)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { imageType: state.img.imageType };
}

export default connect(mapStateToProps, { changeImageType })(selectImageType);
