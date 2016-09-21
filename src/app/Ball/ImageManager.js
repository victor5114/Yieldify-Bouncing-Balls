import { sample } from 'lodash';
import Brands from '../../static/img/Brands';
import Countries from '../../static/img/Countries';
import Politics from '../../static/img/Politics';

import Backgrounds from '../../static/img/Backgrounds';

export const listImageType = [
  'Countries',
  'Brands',
  'Politics',
];

class ImageFlyweight {
  constructor(src) {
    const img = new Image();
    this.src = src;
    this.img = img;
    this.img.src = src;
  }
}

export const ImageFlyweightFactory = (function factory() {
  const flyweights = {};

  return {
    get(srcName, type) {
      const srcID = `${srcName}_${type}`;
      if (!flyweights[srcID]) {
        let src;

        switch (type) {
          case 'Brands': {
            src = Brands[srcName];
            break;
          }
          case 'Countries': {
            src = Countries[srcName];
            break;
          }
          case 'Politics': {
            src = Politics[srcName];
            break;
          }
          case 'Backgrounds': {
            src = Backgrounds[srcName];
            break;
          }
          default: {
            break;
          }
        }
        flyweights[srcID] = new ImageFlyweight(src);
      }
      return flyweights[srcID];
    },
    getCount() {
      let count = 0;
      flyweights.forEach((f) => {
        if ({}.hasOwnProperty.call(flyweights, f)) {
          count++;
        }
      });
      return count;
    },
  };
}());

export function getListImagesByType() {
  return {
    Brands: Object.keys(Brands),
    Countries: Object.keys(Countries),
    Politics: Object.keys(Politics),
    Backgrounds: Object.keys(Backgrounds),
  };
}

export function randomImagePicker(type) {
  const list = getListImagesByType();
  if (!list[type]) {
    return null;
  }
  return sample(list[type]);
}
