/* eslint no-unused-expressions: "off"*/
import { isNull } from 'lodash';
import Ball from '../../../app/Ball/Ball';
import { expect } from '../../testHelper';

describe('%%%%% Ball %%%%%', () => {
  it('should create an instance', () => {
    const ball = new Ball(0, 0, 'Brands', { recenter: true });
    expect(ball).to.exist;
    expect(ball).to.be.instanceof(Ball);
    expect(ball.uuid).to.satisfy((id) => typeof id === 'number');
  });

  it('should create two instances with global increment ID', () => {
    const ball1 = new Ball(0, 0, 'Brands', { recenter: true });
    const ball2 = new Ball(0, 0, 'Brands', { recenter: true });
    expect(ball1.uuid).to.satisfy((id) => typeof id === 'number');
    expect(ball2.uuid).to.satisfy((id) => typeof id === 'number');
    expect(ball1.uuid).to.satisfy((id) => id !== ball2.uuid);
  });

  describe('Object content', () => {
    const ball = new Ball(0, 0, 'Brands', { recenter: true });

    it('should check properties', () => {
      const properties = [
        'coord', 'virtX',
        'initPoint', 'angle',
        'velocity', 'xDir',
        'timeElapsed', 'backgroundImage',
        'strokeColor', 'animate',
      ];

      properties.forEach(prop => {
        expect(ball).to.have.property(prop);
        expect(ball.prop).to.exist;
      });
    });

    // Add more checks on initial properties here
  });

  describe('Method: getRandomColor', () => {
    const ball = new Ball(0, 0, 'Brands', { recenter: true });

    it('Return correct hexa format', () => {
      const REGEX = /^#([0-9a-f]{3}){1,2}$/i;
      expect(ball.getRandomColor().match(REGEX)).to.satisfy((r) => !isNull(r));
    });
  });

  describe('Method: updatePosition', () => {
    let ball;
    const init = { x: 300, y: 100 };

    describe(('recenter is true'), () => {
      beforeEach(() => {
        ball = new Ball(init.x, init.y, 'Brands', { recenter: true });
        // Override to fix constant property
        // NOTE: This should be private variable.
        ball.velocity = 30;
        ball.angle = Math.PI / 2;
      });

      it('Update position after 100ms', () => {
        ball.updatePosition(800, 600, 100);
        expect(Math.floor(ball.coord.x)).to.be.equal(init.x - Ball.BALL_SIZE);
        expect(Math.floor(ball.coord.y)).to.be.equal(36);
      });

      it('Update position after 200ms', () => {
        ball.updatePosition(800, 600, 200);
        expect(Math.floor(ball.coord.x)).to.be.equal(init.x - Ball.BALL_SIZE);
        expect(Math.floor(ball.coord.y)).to.be.equal(24);
      });
    });

    describe(('recenter is false'), () => {
      beforeEach(() => {
        ball = new Ball(init.x, init.y, 'Brands', { recenter: false });
        // Override to fix constant property
        // NOTE: This should be private variable.
        ball.velocity = 30;
        ball.angle = Math.PI / 2;
      });

      it('Update position after 100ms', () => {
        ball.updatePosition(800, 600, 100);
        expect(Math.floor(ball.coord.x)).to.be.equal(init.x - (Ball.BALL_SIZE / 2));
        // Should be up to Ball.BALL_SIZE / 2 compared to recenter true
        expect(Math.floor(ball.coord.y)).to.be.equal(61);
      });

      it('Update position after 200ms', () => {
        ball.updatePosition(800, 600, 200);
        expect(Math.floor(ball.coord.x)).to.be.equal(init.x - (Ball.BALL_SIZE / 2));
        // Should be up to Ball.BALL_SIZE / 2 compared to recenter true
        expect(Math.floor(ball.coord.y)).to.be.equal(49);
      });
    });
  });

  describe('Method: computeXPos', () => {
    // fn compute X coordonate from Math formula.
  });

  describe('Method: computeYPos', () => {
    // fn compute Y coordonate from Math formula.
  });
});
