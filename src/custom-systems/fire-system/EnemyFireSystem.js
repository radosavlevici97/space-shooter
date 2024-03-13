import { delay, getComponentsFor, randomFromInterval } from "../../Utils";
import { app } from "../../main";
import { game } from "../../Game";
import System from "../../core/systems/System";

export default class EnemyFireSystem extends System {
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

  async _fireLoop(enemy) {
    const character = getComponentsFor(enemy, "character");
    const { position } = character;
    const weapon = getComponentsFor(enemy, "weapon");

    const rotation = Math.PI;
    const anchor = 0.5;
    const direction = -rotation - Math.PI;

    await delay(randomFromInterval(1, 3));

    if (enemy.isDeleted) return;

    weapon.fire(
      { position, rotation, direction, anchor },
      app.stage,
      app.renderer.screen
    );
    this._fireLoop(enemy);
  }
}
