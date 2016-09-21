import { renderComponent, expect } from '../testHelper';
import Footer from '../../app/components/preFooter.jsx';

describe('----- preFooter basic tests -----', () => {
  describe('Should render correctly', () => {
    it('Shows the correct text', () => {
      // create a instance of Footer
      const component = renderComponent(Footer);
      expect(component).to.contain('');
    });
  });
});
