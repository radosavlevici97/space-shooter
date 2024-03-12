import Component from "../../core/components/Component";

export default class BackgroundPhysics extends Component {
  constructor(args) {
    super(args);
    this.init();
  }

  init() {
    const { cameraZ, fov, baseSpeed, speed, warpSpeed } = this.config;
    this.cameraZ = cameraZ;
    this.fov = fov;
    this.baseSpeed = baseSpeed;
    this.speed = speed;
    this.warpSpeed = warpSpeed;
  }

  update(time) {
    const delta = time.deltaTime;
    this.speed += (this.warpSpeed - this.speed) / 20;
    this.cameraZ += delta * 10 * (this.speed + this.baseSpeed);
  }
}
