import Component from "../../core/components/Component";

export default class BackgroundPhysics extends Component {
  constructor(args) {
    super(args);
    this.init();
  }

  init() {
    const { cameraZ, fov, baseSpeed, speed, normalWarpSpeed } = this.config;
    this.cameraZ = cameraZ;
    this.fov = fov;
    this.baseSpeed = baseSpeed;
    this.speed = speed;
    this.warpSpeed = normalWarpSpeed;
  }

  update(time) {
    // Simple easing.
    const delta = time.deltaTime;
    this.speed += (this.warpSpeed - this.speed) / 20;
    this.cameraZ += delta * 10 * (this.speed + this.baseSpeed);
  }

  increaseWarpSpeed() {
    const { highWarpSpeed } = this.config;
    !(this.warpSpeed === highWarpSpeed) && (this.warpSpeed = highWarpSpeed);
  }

  decreaseWarpSpeed() {
    const { normalWarpSpeed } = this.config;
    !(this.warpSpeed === normalWarpSpeed) && (this.warpSpeed = normalWarpSpeed);
  }
}
