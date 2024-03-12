import Component from "../core/components/Component";
import { Sprite } from "pixi.js";
import gsap from "gsap";
import { testForAABB } from "../Utils";

export default class WeaponComponent extends Component {
  constructor({ ammoAsset, ...args }) {
    super(args);
    this._ammoAsset = ammoAsset;
    this._firedAmmo = [];
  }

  get firedAmmo() {
    return this._firedAmmo;
  }

  fire(data, containerToLaunch, availableArea) {
    if (!data) console.error("Please provide data for launching");
    const { anchor, direction, position } = data;
    const { speed } = this.config;
    const rocket = Sprite.from(this._ammoAsset);
    rocket.anchor.set(anchor);
    rocket.rotation = direction;
    rocket.x = position.x;
    rocket.y = position.y;
    const newDirection = -direction - Math.PI;

    this._firedAmmo = [...this._firedAmmo, rocket];
    containerToLaunch.addChild(rocket);
    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true });
    tl.to(rocket, {
      x: "+=" + Math.sin(newDirection) * speed, // Increase x position by 200 pixels
      y: "+=" + Math.cos(newDirection) * speed,
      onUpdate: () => {
        if (!testForAABB(rocket, availableArea))
          this._destroyFiredAmmo(rocket, tl);
      },
      ease: "none",
      duration: 1,
    });
  }

  _destroyFiredAmmo(rocket, tl) {
    this._firedAmmo = this._firedAmmo.filter((ammo) => rocket !== ammo);
    tl.kill();
    rocket.destroy();
    rocket.removeFromParent();
  }
}
