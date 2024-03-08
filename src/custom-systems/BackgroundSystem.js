import System from "../core/systems/System";
import { game } from "../Game";
import { app } from "../main";
import { Sprite } from "pixi.js";
import BackgroundStar from "../custom-components/background/BackgroundStar";
import BackgroundPhysics from "../custom-components/background/BackgroundPhysics";
import Config from "../Config";

export default class BackgroundSystem extends System {
  constructor() {
    super();
    this._stars = [];
    this.init();
  }

  init() {
    const { background } = game.entities;
    const backgroundPhysicsComponent = new BackgroundPhysics({
      name: "physicsComponent",
      config: Config.backgroundPhysics,
    });

    background.attachComponents(backgroundPhysicsComponent);
    const { amount } = Config.backgroundStar;
    const { cameraZ } = backgroundPhysicsComponent;

    this._stars = Array.from({ length: amount }, (_, i) => {
      const star = new BackgroundStar({
        name: "starComponent",
        displayObjectSource: Sprite,
        asset: "star",
        config: Config.backgroundStar,
      });

      star.randomize(cameraZ, true);
      background.attachComponents(star);
      return star;
    });
  }

  update(delta) {
    const { background } = game.entities;

    const backgroundPhysicsComponent = background.components.find(
      (component) => component.name === "physicsComponent"
    );

    backgroundPhysicsComponent.update(delta);
    const { cameraZ, fov, speed } = backgroundPhysicsComponent;
    const { width, height } = app.renderer.screen;
    this._stars.forEach((star) => {
      if (star.z < cameraZ) star.randomize(cameraZ, false);
      const z = star.z - cameraZ;
      star.update({ fov, width, height, z, speed });
    });
  }
}
