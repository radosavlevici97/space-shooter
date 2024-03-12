import { TextStyle } from "pixi.js";
import RenderableComponent from "./RenderableComponent";

export default class TextComponent extends RenderableComponent {
  constructor(args) {
    super(args);
  }

  init() {
    const { style: configStyle } = this.config;
    const style = new TextStyle(configStyle);
    this.displayObject.style = style;
    this.updatePosition(this.guidePositions);
  }

  updateValue(newValue) {
    this.displayObject.text = newValue;
  }
}
