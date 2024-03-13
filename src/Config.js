import { FillGradient } from "pixi.js";
const minWidth = 428;
const minHeight = 925;

const config = {
  designConfig: {
    content: {
      width: minWidth,
      height: minHeight,
    },
  },
  game: {
    enemiesGenerationInterval: [3, 6], // interval
    enemiesMovementSlowness: 10,
    playerMovementSpeed: 10,
    enemiesFireRate: [3, 5], // interval
  },
  enemyWeaponComponent: {
    speed: 200, //  px per second
  },
  playerWeaponComponent: {
    speed: 600, //  px per second
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
    cameraZ: 0,
    fov: 20,
    baseSpeed: 0.025,
    speed: 0,
    normalWarpSpeed: 0.01,
    highWarpSpeed: 1,
  },
  backgroundStar: {
    amount: 2000,
    baseSize: 0.05,
    stretch: 5,
  },
  enemies: {},
  explosionComponent: {
    showDuration: 0.7,
    hideDuration: 0.8,
    anchor: 0.5,
    alpha: 0,
    width: 2,
    height: 2,
  },
  counterComponent: {
    style: {
      fontFamily: "Arial",
      fontSize: 72,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: new FillGradient(0, 0, 0, 36 * 1.7 * 7),
      stroke: { color: "#4a1850", width: 5, join: "round" },
      dropShadow: {
        color: "#000000",
        blur: 4,
        angle: Math.PI / 6,
        distance: 6,
      },
      wordWrap: true,
      wordWrapWidth: 440,
    },
    guidePositions: {
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    },
  },
};

export default config;
