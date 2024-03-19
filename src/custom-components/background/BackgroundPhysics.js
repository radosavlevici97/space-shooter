import Component from "../../core/components/Component";

export default class BackgroundPhysics extends Component {
  constructor(args) {
    super(args);
    this.init();
  }

  get speed() {
    return this._speed;
  }

  get fov() {
    return this._fov;
  }

  get cameraZ() {
    return this._cameraZ;
  }

  init() {
    const { cameraZ, fov, baseSpeed, speed, normalWarpSpeed } = this.config;
    this._cameraZ = cameraZ;
    this._fov = fov;
    this._speed = speed;
    this._baseSpeed = baseSpeed;
    this._warpSpeed = normalWarpSpeed;
  }

  update(time) {
    // Simple easing.
    const delta = time.deltaTime;
    this._speed += (this._warpSpeed - this._speed) / 20;
    this._cameraZ += delta * 10 * (this._speed + this._baseSpeed);
  }

  increaseWarpSpeed() {
    const { highWarpSpeed } = this.config;
    !(this._warpSpeed === highWarpSpeed) && (this._warpSpeed = highWarpSpeed);
  }

  decreaseWarpSpeed() {
    const { normalWarpSpeed } = this.config;
    !(this._warpSpeed === normalWarpSpeed) &&
      (this._warpSpeed = normalWarpSpeed);
  }
}
