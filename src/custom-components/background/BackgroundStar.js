import RenderableComponent from "../../core/components/RenderableComponent";

export default class BackgroundStar extends RenderableComponent {
  init() {
    this.displayObject.anchor.x = 0.5;
    this.displayObject.anchor.y = 0.7;
    this._x = 0;
    this._y = 0;
    this._z = 0;
  }

  get z() {
    return this._z;
  }

  /**
   * @description Updates the movement, the scale and the rotation of a star
   * @param {object} data
   * @public
   */
  update({ fov, width, height, cameraZ, speed }) {
    const { amount, stretch, baseSize } = this.config;

    // Map star 3d position to 2d with really simple projection
    const z = this._z - cameraZ;

    this.displayObject.x = this._x * (fov / z) * width + width / 2;
    this.displayObject.y = this._y * (fov / z) * width + height / 2;

    // Calculate star scale & rotation.
    const dxCenter = this.displayObject.x - width / 2;
    const dyCenter = this.displayObject.y - height / 2;

    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
    const distanceScale = Math.max(0, (amount - z) / amount);

    this.displayObject.scale.x = distanceScale * baseSize;
    // Star is looking towards center so that y axis is towards center.
    // Scale the star depending on how fast we are moving, what the stretchfactor is
    // and depending on how far away it is from the center.
    this.displayObject.scale.y =
      distanceScale * baseSize +
      (distanceScale * speed * stretch * distanceCenter) / width;

    this.displayObject.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
  }

  /**
   * @description Calculate random positions
   * @param {number} cameraZ z pozition
   * @param {boolean} initial Container to add the ammo
   * @public
   */
  randomize(cameraZ, initial) {
    const { amount } = this.config;

    this._z = initial
      ? Math.random() * amount
      : cameraZ + (Math.random() * amount) / 2 + amount;
    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;

    this._x = Math.cos(deg) * distance;
    this._y = Math.sin(deg) * distance;
  }
}
