import Component from "./Component";
import { Container, Sprite } from "pixi.js";

export default class RenderableComponent extends Component {
  constructor({ displayObjectSource = Container, asset, ...args }) {
    super(args);
    this._attachable = this.config?.attachable || true;
    this._guidePositions = this.config?.guidePositions;
    this.displayObject = this.create({ displayObjectSource, asset });
    this.init();
  }

  get attachable() {
    return this._attachable;
  }

  get guidePositions() {
    return this._guidePositions;
  }

  get position() {
    return this.displayObject.position;
  }

  get size() {
    return {
      width: this.displayObject.width,
      height: this.displayObject.height,
    };
  }

  init() {}

  create({ displayObjectSource, asset }) {
    if (!asset) {
      return new displayObjectSource();
    }

    return displayObjectSource.from(asset);
  }

  addChild(child) {
    this.displayObject.addChild(child);
  }

  removeChild(child) {
    this.displayObject.removeChild(child);
  }

  removeChildren() {
    this.displayObject.removeChildren();
  }
}
