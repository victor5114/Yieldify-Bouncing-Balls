/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../../testHelper.jsx';
import selectImageType from '../../../app/containers/selectImageType.jsx';

describe('##### Select Image Type tests #####', () => {
  describe('Should find unique elements', () => {
    let component;
    beforeEach(() => {
      component = renderComponent(selectImageType);
    });

    it('Unique container list', () => {
      expect(component).to.have.class('select-dropdown');
    });

    it('Should contain the Countries Category by default', () => {
      expect(component.find('.rw-input')).to.contain('Countries');
    });

    // Add more tests here.
  });
});
