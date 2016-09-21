import React, { PropTypes } from 'react';
import Dropdownlist from 'react-widgets/lib/DropdownList';
import { connect } from 'react-redux';
import { changeImageType } from '../actions/index';
import { listImageType } from '../Ball/ImageManager';

const selectImageType = (props) =>
  <div className="select-dropdown">
    <Dropdownlist
      value={props.imageType}
      data={listImageType}
      onChange={value => props.changeImageType(value)}
    />
  </div>;

selectImageType.propTypes = {
  imageType: PropTypes.string.isRequired,
  changeImageType: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { imageType: state.img.imageType };
}

export default connect(mapStateToProps, { changeImageType })(selectImageType);
