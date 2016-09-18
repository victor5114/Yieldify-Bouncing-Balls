import { sample } from 'lodash';
import Brands from '../static/Brands';
import Countries from '../static/Countries';
import Politics from '../static/Politics';

class ImageFlyweight {
  constructor(src) {
    const img = new Image();
    this.src = src;
    this.img = img;
    this.img.src = src;
  }
}

export function getListImagesByType() {
  return {
    Brands: Object.keys(Brands),
    Countries: Object.keys(Countries),
    Politics: Object.keys(Politics),
  };
}

export function randomImagePicker(type) {
  const list = getListImagesByType();
  if (!list[type]) {
    return null;
  }
  return sample(list[type]);
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
