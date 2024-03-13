import { delay, getComponentsFor, randomFromInterval } from "../../Utils";
import { app } from "../../main";
import { game } from "../../Game";
import System from "../../core/systems/System";
import config from "../../Config";

export default class EnemyFireSystem extends System {
  /**
   * @description Start the fire loop for the new enetities added in the game
   * @public
   */
  updateEntities() {
    const { entities } = game;
    const enemies = entities.getEntities("enemy", "weapon");

    enemies.forEach((enemy) => {
      const weapon = getComponentsFor(enemy, "weapon");

      if (weapon.isFiring) return;

      weapon.isFiring = true;
      this._fireLoop(enemy);
    });
  }
  /**
   * @description Fire loop function. Is intrerupted when the entity is deleted
   * @param {object} enemy
   * @private
   */
  async _fireLoop(enemy) {
    const character = getComponentsFor(enemy, "character");
    const { position } = character;
    const weapon = getComponentsFor(enemy, "weapon");

    const rotation = Math.PI;
    const anchor = 0.5;
    const direction = -rotation - Math.PI;
    const { enemiesFireRate } = config.game;

    await delay(randomFromInterval(...enemiesFireRate));

    if (enemy.isDeleted) return;

    weapon.fire(
      { position, rotation, direction, anchor },
      app.stage,
      app.renderer.screen
    );
    this._fireLoop(enemy);
  }
}
