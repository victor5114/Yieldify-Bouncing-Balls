export const listLenght1 = {
  balls: {
    activeBallIds: [0],
    ballList: {
      0: {
        uuid: 0,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
    },
  },
  img: {
    imageType: '',
  },
};

export const pausedLength1 = {
  ...listLenght1,
  balls: {
    ...listLenght1.balls,
    activeBallIds: [],
  },
};

export const listLenght2 = {
  balls: {
    activeBallIds: [0, 1],
    ballList: {
      0: {
        uuid: 0,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
      1: {
        uuid: 1,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
    },
  },
  img: {
    imageType: '',
  },
};

export const listLenght3 = {
  balls: {
    activeBallIds: [0, 1, 2],
    ballList: {
      0: {
        uuid: 0,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
      1: {
        uuid: 1,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
      2: {
        uuid: 2,
        backgroundImage: { img: { src: '' } },
        coord: { x: 0, y: 0 },
      },
    },
  },
  img: {
    imageType: '',
  },
};
