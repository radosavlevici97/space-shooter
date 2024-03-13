import RenderableComponent from "../core/components/RenderableComponent";
import gsap from "gsap";

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

  /**
   * @description Show the explosion
   * @param {object} target Object with a position where the explosion should be generated
   * @public
   */
  async show(target) {
    const { showDuration } = this.config;
    const {
      size: { width, height },
    } = target;

    await gsap.to(this.displayObject, {
      height: height * 2,
      width: width * 2,
      alpha: 1,
      duration: showDuration,
      onUpdate: () => {
        const {
          position: { x, y },
        } = target;

        this.updatePosition({ x, y }, { reset: true });
      },
    });
  }

  /**
   * @description Hide the explosion
   * @param {object} target Object with a position where the explosion should be generated
   * @public
   */
  async hide(target) {
    const { hideDuration } = this.config;

    await gsap.to(this.displayObject, {
      alpha: 0.4,
      duration: hideDuration,
      onUpdate: () => {
        const {
          position: { x, y },
        } = target;

        this.updatePosition({ x, y }, { reset: true });
      },
    });
  }
}
