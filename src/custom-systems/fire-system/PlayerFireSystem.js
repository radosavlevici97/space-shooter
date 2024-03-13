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

  /**
   * @description Add the listeners
   * @param {object} hitContainer container to hit
   * @private
   */
  _addEvents(hitContainer) {
    hitContainer.on("click", (e) => {
      this._fire(e);
    });

    hitContainer.on("pointermove", (e) => {
      this._pointToTarget(e);
    });
  }

  /**
   * @description Rotate the laser according to mouse position
   * @param {event} e
   * @private
   */
  _pointToTarget(e) {
    const { clientX, clientY } = e;

    const {
      entities: { player },
    } = game;
    const character = getComponentsFor(player, "character");
    const {
      position: { x, y },
    } = character;
    const laser = getComponentsFor(player, "laser");

    const rotation = Math.atan2(clientY - y, clientX - x) + Math.PI / 2;
    const newAngle = (rotation * 180) / Math.PI;

    laser.rotate(newAngle);
  }

  /**
   * @description Fire one time
   * @param {event} e
   * @private
   */
  _fire(e) {
    const { clientX, clientY } = e;

    const {
      entities: { player },
    } = game;
    const weapon = getComponentsFor(player, "weapon");
    const character = getComponentsFor(player, "character");

    const anchor = 0.5;
    const { position } = character;
    const { x, y } = position;
    const rotation = Math.atan2(clientY - y, clientX - x) + Math.PI / 2;
    const direction = -rotation - Math.PI;

    weapon.fire(
      { position, rotation, direction, anchor },
      app.stage,
      app.renderer.screen
    );
  }
}
