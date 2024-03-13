import Component from "../core/components/Component";
import { Sprite } from "pixi.js";
import gsap from "gsap";
import { testForAABB } from "../Utils";

export default class WeaponComponent extends Component {
  constructor({ ammoAsset, ...args }) {
    super(args);
    this._ammoAsset = ammoAsset;
    this._firedAmmo = [];
    this.isFiring = false;
  }

  get firedAmmo() {
    return this._firedAmmo;
  }

  fire(data, containerToLaunch, availableArea) {
    if (!data) console.error("Please provide data for launching");

    const { anchor, direction, rotation, position } = data;
    const { speed } = this.config;
    const rocket = Sprite.from(this._ammoAsset);

    rocket.anchor.set(anchor);
    rocket.rotation = rotation;
    rocket.x = position.x;
    rocket.y = position.y;

    this._firedAmmo = [...this._firedAmmo, rocket];

    containerToLaunch.addChild(rocket);

    const tl = gsap.timeline({ repeat: -1, repeatRefresh: true });
    tl.to(rocket, {
      x: "+=" + Math.sin(direction) * speed, // Increase x position by 200 pixels
      y: "+=" + Math.cos(direction) * speed,
      onUpdate: () => {
        if (testForAABB(rocket, availableArea)) return;

        this.destroyFiredAmmo(rocket, tl);
      },
      ease: "none",
      duration: 1,
    });
  }

  destroyFiredAmmo(rocket, tl) {
    tl ? tl.kill() : gsap.killTweensOf(rocket);

    this._firedAmmo = this._firedAmmo.filter((ammo) => rocket !== ammo);

    rocket.destroy();
    rocket.removeFromParent();
  }
}
