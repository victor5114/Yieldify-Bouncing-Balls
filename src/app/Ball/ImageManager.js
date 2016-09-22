import { sample, each } from 'lodash';
import Companies from '../../static/img/Companies';
import Countries from '../../static/img/Countries';
import Politics from '../../static/img/Politics';

import Backgrounds from '../../static/img/Backgrounds';

export const listImageType = [
  'Countries',
  'Politics',
  'Companies',
];

class ImageFlyweight {
  constructor(src) {
    const img = new Image();
    this.src = src;
    this.img = img;
    this.img.src = typeof src === 'object' ? 'noop' : src;
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
          case 'Companies': {
            src = Companies[srcName];
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
            src = 'noop';
            break;
          }
        }
        flyweights[srcID] = new ImageFlyweight(src);
      }
      return flyweights[srcID];
    },
    getCount() {
      let count = 0;
      each(flyweights, (f, i) => {
        if ({}.hasOwnProperty.call(flyweights, i)) {
          count++;
        }
      });
      return count;
    },
  };
}());

export function getListImagesByType() {
  return {
    Companies: Object.keys(Companies),
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
