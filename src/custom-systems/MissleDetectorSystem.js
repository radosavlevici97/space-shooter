import { getComponentsFor, testForAABB } from "../Utils";
import System from "../core/systems/System";
import { game } from "../Game";
import ExplosionComponent from "../custom-components/ExplosionComponent";
import config from "../Config";
import { Sprite } from "pixi.js";
import gsap from "gsap";

export default class MissleDetectorSystem extends System {
  update(time) {
    this._playerColission();
    this._enemyColission();
  }

  _playerColission() {
    const { entities } = game;
    const { foreground } = entities;
    const deadEnemiesCounter = getComponentsFor(foreground, "counter");
    const enemiesWithWeapons = entities.getEntities("enemy", "weapon");
    enemiesWithWeapons.forEach((enemy) => {
      const { player } = entities;
      const playerCharacter = getComponentsFor(player, "character");
      const { displayObject: playerDisplayObject } = playerCharacter;
      const enemyWeapon = getComponentsFor(enemy, "weapon");
      enemyWeapon.firedAmmo.forEach((ammo) => {
        if (testForAABB(ammo, playerDisplayObject)) {
          window.alert("game finished! please refresh the page");
        }
      });
    });
  }

  _enemyColission() {
    const { entities } = game;
    const { foreground } = entities;
    const enemies = entities.getEntities("enemy");
    const deadEnemiesCounter = getComponentsFor(foreground, "counter");
    const { player } = entities;
    const playerWeapon = getComponentsFor(player, "weapon");
    playerWeapon.firedAmmo.forEach((ammo) => {
      enemies.forEach((enemy) => {
        if (enemy.isDeleted || ammo.destroyed) return;

        const enemyCharacter = getComponentsFor(enemy, "character");
        const { displayObject: enemyDisplayObject } = enemyCharacter;

        if (testForAABB(ammo, enemyDisplayObject)) {
          this._generateExplosion(enemy, playerWeapon, ammo);
          deadEnemiesCounter.increase();
        }
      });
    });
  }

  async _generateExplosion(enemy, playerWeapon, ammo) {
    const { entities } = game;
    const character = getComponentsFor(enemy, "character");
    const explosion = new ExplosionComponent({
      displayObjectSource: Sprite,
      name: "explosion",
      asset: "explosion",
      config: config.explosionComponent,
    });
    enemy.attachComponents(explosion);
    //await explosion.show(character);
    //character.hide();
    playerWeapon.destroyFiredAmmo(ammo);
    //await explosion.hide();
    entities.remove(enemy);
  }
}
