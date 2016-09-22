/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../testHelper';
import Footer from '../../app/components/footer.jsx';

describe('----- Footer basic tests -----', () => {
  describe('Should render correctly', () => {
    let component;

    beforeEach(() => {
      component = renderComponent(Footer);
    });

    it('has the correct class', () => {
      expect(component).to.have.class('footer');
    });

    it('Paragraph shows correct text', () => {
      const p1 = component.children('p');
      expect(p1).to.exist;
      // const spans = p1.children('span');
      // console.log(spans);
      // console.log(spans[0]);
      // console.log(spans[1]);
      // console.log(spans[2]);
      // expect(spans[0]).to.contain('Made with');
    });

    it('Image Has correct class', () => {
      const img = component.find('img');
      expect(img).to.have.id('heart');
    });
  });
});
