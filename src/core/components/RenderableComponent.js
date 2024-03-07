import Component from "./Component";
import { Container, Sprite } from "pixi.js";

export default class RenderableComponent extends Component {
  constructor({ displayObjectSource = Container, asset, ...args }) {
    super(args);
    this.displayObject = this._create({ displayObjectSource, asset });
    this._attachable = this.config?.attachable || true;
    this._guidePositions = this.config?.guidePositions;
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

  set position(value) {
    this.displayObject.position.set(...value);
  }

  set x(value) {
    this.displayObject.x = value;
  }

  set y(value) {
    this.displayObject.y = value;
  }

  init() {}

  addChild(child) {
    this.displayObject.addChild(child);
  }

  removeChild(child) {
    this.displayObject.removeChild(child);
  }

  removeChildren() {
    this.displayObject.removeChildren();
  }

  _create({ displayObjectSource, asset }) {
    if (!asset) {
      return new displayObjectSource();
    }

    return displayObjectSource.from(asset);
  }
}
