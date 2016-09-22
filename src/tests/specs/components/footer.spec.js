/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../../testHelper';
import Footer from '../../../app/components/footer.jsx';

describe('##### Footer basic tests #####', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Footer);
  });

  describe('Should render correctly', () => {
    it('has the correct class', () => {
      expect(component).to.have.class('footer');
    });

    it('Paragraph shows correct text', () => {
      const p1 = component.children('p');
      expect(p1).to.exist;

      const span1 = p1.children('span').first();
      expect(span1).to.contain('Made with');

      const span2 = span1.next();
      expect(span2.find('img')).to.exist;
      expect(span2.find('img')).to.have.id('heart');

      const span3 = span2.next();
      expect(span3).to.contain('by Victor Pongnian for Yieldify');
    });
  });
});
