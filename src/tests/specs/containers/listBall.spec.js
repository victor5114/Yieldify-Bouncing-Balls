/* eslint no-unused-expressions: "off"*/
import { renderComponent, expect } from '../../testHelper.jsx';
import listBall from '../../../app/containers/listBall.jsx';
import { listLenght2 } from '../../mocks/states';

describe('##### List Ball basic tests #####', () => {
  describe('Should find unique elements', () => {
    let component;
    beforeEach(() => {
      component = renderComponent(listBall);
    });

    it('Unique container list', () => {
      expect(component).to.have.class('container-list-ball');
    });

    it('List should render empty', () => {
      expect(component.find('.empty-ball-list')).to.exist;
    });
  });

  describe('Should check not empty list', () => {
    let component;

    beforeEach(() => {
      // Mock up
      const props = listLenght2;
      component = renderComponent(listBall, null, props);
    });

    it('show each ball in the list', () => {
      expect(component.find('li').length).to.equal(2);
    });

    it('should check class of buttons', () => {
      expect(component.find('ul li button').first()).to.have.class('btn-default');
      expect(component.find('ul li button').first().children())
        .to.have.class('glyphicon glyphicon-pause');
      expect(component.find('ul li button').first().next()).to.have.class('btn-danger');
      expect(component.find('ul li button').first().next().children())
        .to.have.class('glyphicon glyphicon-trash');
    });

    it('should remove list elem if trash button is clicked', () => {
      const trashButton = component.find('ul li button').first().next();
      trashButton.simulate('click');
      expect(component.find('li').length).to.equal(1);
    });

    it('should change pause button if clicked', () => {
      const pauseButton = component.find('ul li button').first();
      pauseButton.simulate('click');
      expect(component.find('ul li button').first().children())
        .to.have.class('glyphicon glyphicon-play');
    });

    it('should change play button if clicked', () => {
      const pauseButton = component.find('ul li button').first();
      pauseButton.simulate('click');

      const resumeButton = component.find('ul li button').first();
      resumeButton.simulate('click');

      expect(component.find('ul li button').first().children())
        .to.have.class('glyphicon glyphicon-pause');
    });
  });
});
