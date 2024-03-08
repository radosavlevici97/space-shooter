import RenderableComponent from "../../core/components/RenderableComponent";

export default class BackgroundStar extends RenderableComponent {
  init() {
    this.displayObject.anchor.x = 0.5;
    this.displayObject.anchor.y = 0.7;
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  update({ fov, width, height, z, speed }) {
    const { amount, stretch, baseSize } = this.config;
    this.displayObject.x = this.x * (fov / z) * width + width / 2;
    this.displayObject.y = this.y * (fov / z) * width + height / 2;

    // Calculate star scale & rotation.
    const dxCenter = this.displayObject.x - width / 2;
    const dyCenter = this.displayObject.y - height / 2;
    const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
    const distanceScale = Math.max(0, (amount - z) / amount);
    this.displayObject.scale.x = distanceScale * baseSize;
    // Star is looking towards center so that y axis is towards center.
    // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
    this.displayObject.scale.y =
      distanceScale * baseSize +
      (distanceScale * speed * stretch * distanceCenter) / width;
    this.displayObject.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
  }

  randomize(cameraZ, initial) {
    const { amount } = this.config;
    this.z = initial
      ? Math.random() * amount
      : cameraZ + (Math.random() * amount) / 2 + amount;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    this.x = Math.cos(deg) * distance;
    this.y = Math.sin(deg) * distance;
  }
}
