import { Container, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";
import {
  delay,
  getComponentsFor,
  randomFromInterval,
  testForAABB,
} from "../../Utils";
import { app } from "../../main";
import System from "../../core/systems/System";

export default class EnemyFireSystem extends System {
  async start() {
    const enemiesWithWeapons = this._getEnemiesWithWeapons();
    enemiesWithWeapons.forEach(this._fire, this);
  }

  async _fire(enemy) {
    const character = getComponentsFor(enemy, "character");
    const { position } = character;
    const weapon = getComponentsFor(enemy, "weapon");
    const direction = Math.PI;
    const anchor = 0.5;
    await delay(randomFromInterval(1, 3));
    weapon.fire(
      { position, direction, anchor },
      enemy.container,
      app.renderer.screen
    );
    this._fire(enemy);
  }

  _getEnemiesWithWeapons() {
    const { entities } = game;
    const enemies = entities.getEntities("enemy", "weapon");
    return enemies;
  }
}
