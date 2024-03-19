import System from "../core/systems/System";
import { game } from "../Game";
import { app } from "../main";
import { Sprite } from "pixi.js";
import BackgroundStar from "../custom-components/background/BackgroundStar";
import BackgroundPhysics from "../custom-components/background/BackgroundPhysics";
import Config from "../Config";
import { getComponentsFor } from "../Utils";

export default class BackgroundSystem extends System {
  constructor() {
    super();
    this.init();
  }

  /**
   * @description Stars setup
   * @public
   */
  init() {
    const { background } = game.entities;
    const backgroundPhysicsComponent = new BackgroundPhysics({
      name: "physics",
      config: Config.backgroundPhysics,
    });

    background.attachComponents(backgroundPhysicsComponent);

    const { amount } = Config.backgroundStar;
    const { cameraZ } = backgroundPhysicsComponent;

    Array.from({ length: amount }, (_, i) => {
      const star = new BackgroundStar({
        name: `star${i}`,
        displayObjectSource: Sprite,
        asset: "star",
        config: Config.backgroundStar,
      });

      star.randomize(cameraZ, true);

      background.attachComponents(star);

      return star;
    });
  }

  /**
   * @description Update's star position and scale on every frame, based on background physics properties.
   * @param {object} time pixijs ticker's time
   * @public
   */
  update(time) {
    const { entities } = game;
    const { background } = entities;
    const enemies = entities.getEntities("enemy");

    const backgroundPhysicsComponent = getComponentsFor(background, "physics");
    const backgroundStars = getComponentsFor(background, "star");

    const { cameraZ, fov, speed } = backgroundPhysicsComponent;
    const { width, height } = app.renderer.screen;

    !enemies?.length
      ? backgroundPhysicsComponent.increaseWarpSpeed()
      : backgroundPhysicsComponent.decreaseWarpSpeed();

    backgroundPhysicsComponent.update(time);

    backgroundStars.forEach((star) => {
      if (star.z < cameraZ) star.randomize(cameraZ, false);

      star.update({ fov, width, height, cameraZ, speed });
    });
  }
}
