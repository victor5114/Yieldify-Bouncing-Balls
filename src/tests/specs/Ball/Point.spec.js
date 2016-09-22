/* eslint no-unused-expressions: "off"*/
import Point from '../../../app/Ball/Point';
import { expect } from '../../testHelper';

describe('%%%%% Point %%%%%', () => {
  it('should create an instance with no parameters', () => {
    const point = new Point();
    expect(point.x).to.exist;
    expect(point.y).to.exist;
    expect(point.x).to.be.equal(0);
    expect(point.y).to.be.equal(0);
  });

  it('should create an instance with parameters', () => {
    const point = new Point(10, 20);
    expect(point.x).to.exist;
    expect(point.y).to.exist;
    expect(point.x).to.be.equal(10);
    expect(point.y).to.be.equal(20);
  });
});
