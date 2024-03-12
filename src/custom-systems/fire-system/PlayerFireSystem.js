import { getComponentsFor } from "../../Utils";
import { game } from "../../Game";
import { app } from "../../main";
import System from "../../core/systems/System";

export default class EnemyFireSystem extends System {
  constructor(args) {
    super(args);
    this.init();
  }

  init() {
    const { hitContainer } = game;
    this._addEvents(hitContainer);
  }

  _addEvents(hitContainer) {
    //add click event
    console.log("events");
    hitContainer.on("click", (e) => {
      console.log("click");
      this._fire(e);
    });
    hitContainer.on("pointermove", (e) => {
      this._pointToTarget(e);
    });
  }

  _pointToTarget(e) {
    const {
      entities: { player },
    } = game;
    const { clientX, clientY } = e;
    const character = getComponentsFor(player, "character");
    const {
      position: { x, y },
    } = character;
    const laser = getComponentsFor(player, "laser");
    const rotation = Math.atan2(clientY - y, clientX - x) + Math.PI / 2;
    const newAngle = (rotation * 180) / Math.PI;
    laser.rotate(newAngle);
  }

  _fire(e) {
    const {
      entities: { player },
    } = game;
    const { clientX, clientY } = e;
    const weapon = getComponentsFor(player, "weapon");
    const character = getComponentsFor(player, "character");
    const anchor = 0.5;
    const { position } = character;
    const { x, y } = position;
    const direction = Math.atan2(clientY - y, clientX - x) + Math.PI / 2;
    weapon.fire(
      { position, direction, anchor },
      player.container,
      app.renderer.screen
    );
  }
}
