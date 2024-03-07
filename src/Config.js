const minWidth = 428;
const minHeight = 925;

const config = {
  designConfig: {
    content: {
      width: minWidth,
      height: minHeight,
    },
  },
  game: {},
  rocketLauncher: {
    attachable: false,
  },
  playerComponent: {
    guidePositions: {
      x: minWidth / 2,
      y: minHeight / 2,
    },
  },
  enemyComponent: {
    characterWidth: 68,
    characterHeight: 52,
  },
  laserComponent: {
    alpha: 0.4,
    lineColor: 0xaa0114,
    stroke: 5,
    initialLineX: 0,
    initialLineY: -3,
    guidePositions: {
      x: minWidth / 2,
      y: minHeight / 2,
    },
  },
  backgroundPhysics: {},
  enemies: {},
};

export default config;
