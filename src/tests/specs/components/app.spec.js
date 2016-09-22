/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../../testHelper';
import App from '../../../app/components/app.jsx';

describe('##### App basic tests #####', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(App);
  });

  describe('Should find unique elements', () => {
    it('Unique footer', () => {
      expect(component.find('.footer')).to.exist;
    });

    it('Unique pre-footer', () => {
      expect(component.find('.pre-footer')).to.exist;
    });
  });
});
