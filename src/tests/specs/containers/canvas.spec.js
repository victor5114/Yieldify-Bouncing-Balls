/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../../testHelper.jsx';
import canvasBall from '../../../app/containers/canvasBall.jsx';

describe('##### Canvas basic tests #####', () => {
  describe('Should find unique elements', () => {
    let component;
    beforeEach(() => {
      component = renderComponent(canvasBall);
    });

    it('Unique container list', () => {
      expect(component.children().first()).to.have.id('canvas');
    });
  });
});
