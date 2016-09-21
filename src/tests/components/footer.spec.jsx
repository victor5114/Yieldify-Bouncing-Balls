import { renderComponent, expect } from '../testHelper';
import Footer from '../../app/components/footer.jsx';

describe('Should render correctly', () => {
  it('Shows the correct text', () => {
    const component = renderComponent(Footer);
    expect(component).to.contain('React simple starter');
  });
});
