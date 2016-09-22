/* eslint no-unused-expressions: "off"*/
import { isObject, each } from 'lodash';
import { expect } from '../../testHelper';
import {
  listImageType,
  ImageFlyweightFactory,
  getListImagesByType,
  randomImagePicker,
} from '../../../app/Ball/ImageManager';

describe('%%%%% ImageManager %%%%%', () => {
  describe('Method: listImageType', () => {
    it('Should be an array', () => {
      expect(listImageType).to.be.instanceof(Array);
    });

    it('Elements should be string', () => {
      listImageType.forEach(elem => {
        expect(elem).to.satisfy((e) => typeof e === 'string');
      });
    });

    it('Should match to defined values', () => {
      const values = ['Countries', 'Companies', 'Politics'];
      listImageType.forEach(elem => {
        const idx = values.indexOf(elem);
        expect(idx).to.be.above(-1);
      });
    });
  });

  describe('Method: ImageFlyweightFactory', () => {
    it('Should return noop image object if type not known from Imagetype list', () => {
      const imageTypeMock = 'anything';
      expect(listImageType.indexOf(imageTypeMock)).to.be.equal(-1);

      const img1 = ImageFlyweightFactory.get('anything_as_well', imageTypeMock);
      expect(img1.src).to.be.equal('noop');
    });

    it('Share reference if object are retrieved multiple times', () => {
      const imageTypeMock = 'anything';
      expect(listImageType.indexOf(imageTypeMock)).to.be.equal(-1);

      const img1 = ImageFlyweightFactory.get('anything_as_well', imageTypeMock);
      const img2 = ImageFlyweightFactory.get('anything_as_well', imageTypeMock);
      expect(img2).to.satisfy((i) => i === img1);
      expect(ImageFlyweightFactory.getCount()).to.be.equal(2); // Side effect null_Brands in object.

      const img3 = ImageFlyweightFactory.get('anything_other', imageTypeMock);
      expect(img3).to.satisfy((i) => i !== img1);
      expect(ImageFlyweightFactory.getCount()).to.be.equal(3); // Side effect null_Brands in object.
    });
  });

  describe('Method: getListImagesByType', () => {
    it('Should return associative array executed', () => {
      const imagesMapList = getListImagesByType();
      expect(imagesMapList).to.satisfy((l) => isObject(l));
    });

    it('Should have 4 element in table', () => {
      const imagesMapList = getListImagesByType();
      expect(Object.keys(imagesMapList).length).to.be.equal(4);
      each(imagesMapList, (elem) => {
        expect(elem).to.be.instanceof(Array);
      });
    });
  });

  describe('Method: randomImagePicker', () => {
    it('Should return null if wrong type parameter', () => {
      expect(randomImagePicker('anything')).to.be.null();
    });

    it('Should return random image name if correct type parameter', () => {
      expect(randomImagePicker('Companies')).to.be.not.null();
    });
  });
});
