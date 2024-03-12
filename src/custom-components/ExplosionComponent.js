import RenderableComponent from "../core/components/RenderableComponent";
import { Graphics } from "pixi.js";

export default class ExplosionComponent extends RenderableComponent {
  init() {
    const {
      width: initialWidth,
      height: initialHeight,
      alpha,
      anchor,
    } = this.config;
    this.displayObject.width = initialWidth;
    this.displayObject.height = initialHeight;
    this.displayObject.anchor.set(anchor);
    this.displayObject.alpha = alpha;
  }

  async show(target) {
    const { showDuration } = this.config;
    const {
      size: { width, height },
    } = target;
    await gsap.to(this.displayObject, {
      height: height / 3,
      width,
      alpha: 1,
      duration: showDuration,
      onUpdate: () => {
        const { position } = target;
        this._updatePositions(position, { reset: true });
      },
    });
  }

  async hide() {
    const { hideDuration } = this.config;
    await gsap.to(this.displayObject, { alpha: 0, duration: hideDuration });
  }
}
