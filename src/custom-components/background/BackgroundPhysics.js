import Component from "../../core/components/Component";

export default class BackgroundPhysics extends Component {
  constructor(args) {
    super(args);
    this.init();
  }

  init() {
    const {
      starAmount,
      cameraZ,
      fov,
      baseSpeed,
      speed,
      warpSpeed,
      starStretch,
      starBaseSize,
    } = this.config;
    this.starAmount = starAmount;
    this.cameraZ = cameraZ;
    this.fov = fov;
    this.baseSpeed = baseSpeed;
    this.speed = speed;
    this.warpSpeed = warpSpeed;
    this.starStretch = starStretch;
    this.starBaseSize = starBaseSize;
  }
}
