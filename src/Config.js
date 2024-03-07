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
  rocketLauncherComponent: {
    attachable: false,
  },
  playerComponent: {
    guidePositions: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 1.1,
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
      x: window.innerWidth / 2,
      y: window.innerHeight / 1.1,
    },
  },
  backgroundPhysics: {
    starAmount: 2000,
    cameraZ: 0,
    fov: 20,
    baseSpeed: 0.025,
    speed: 0,
    warpSpeed: 0,
    starStretch: 5,
    starBaseSize: 0.05,
  },
  enemies: {},
};

export default config;
