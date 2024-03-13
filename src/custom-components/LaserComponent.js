import RenderableComponent from "../core/components/RenderableComponent";
import { Graphics } from "pixi.js";

export default class LaserComponent extends RenderableComponent {
  init() {
    const { alpha, lineColor, stroke, initialLineX, initialLineY } =
      this.config;
    const laser = new Graphics();

    laser.lineTo(initialLineX, initialLineY * this.guidePositions.y);
    laser.stroke({ width: stroke, color: lineColor });
    laser.x = this.guidePositions.x;
    laser.y = this.guidePositions.y;
    laser.alpha = alpha;

    this.addChild(laser);

    this.updatePosition(this.guidePositions, { reset: true });

    this.displayObject.pivot.set(this.guidePositions.x, this.guidePositions.y);
  }

  rotate(degrees) {
    this.displayObject.angle = degrees;
  }
}
