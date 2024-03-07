import RenderableComponent from "../core/components/RenderableComponent";
import { Graphics } from "pixi.js";

export default class LaserComponent extends RenderableComponent {
  init() {
    const { alpha, lineColor, stroke, initialLineX, initialLineY } =
      this.config;
    const laser = new Graphics();
    laser.lineStyle(stroke, lineColor);
    laser.lineTo(initialLineX, initialLineY * this.guidePositions.y);
    laser.x = this.guidePositions.x;
    laser.y = this.guidePositions.y;
    laser.alpha = alpha;
    this.addChild(laser);
    this.displayObject.x = this.guidePositions.x;
    this.displayObject.y = this.guidePositions.y;
    this.displayObject.pivot.set(this.guidePositions.x, this.guidePositions.y);
  }

  rotate() {}
}
