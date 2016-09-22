import { renderComponent, expect } from '../../testHelper.jsx';
import preFooter from '../../../app/components/preFooter.jsx';

describe('##### Pre-footer basic tests #####', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(preFooter);
  });

  describe('Should render correctly', () => {
    it('Shows the 7 logos', () => {
      const images = component.children('img');
      expect(images.length).to.be.equal(7);
    });
  });
});
