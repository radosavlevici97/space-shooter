import RenderableComponent from "../../core/components/RenderableComponent";

export default class PlayerCharacter extends RenderableComponent {
  init() {
    this.displayObject.anchor.set(0.5);
    this.displayObject.x = this.config.initialX;
    this.displayObject.y = this.config.initialY;
  }
}
