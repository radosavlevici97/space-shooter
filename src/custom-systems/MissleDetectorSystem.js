import { getComponentsFor, testForAABB } from "../Utils";
import System from "../core/systems/System";

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
      const enemyWeapon = getComponentsFor(enemy, "weapon");
      enemyWeapon.firedAmmo.forEach((ammo) => {
        if (testForAABB(ammo, playerCharacter)) {
          window.alert("game finished! please refresh the page");
        }
      });
    });
  }

  _enemyColission() {
    const { entities } = game;
    const { foreground } = entities;
    const { enemies } = entities.getEntities("enemy");
    const deadEnemiesCounter = getComponentsFor(foreground, "counter");

    const { player } = entities;
    const playerWeapon = getComponentsFor(player, "weapon");
    playerWeapon.firedAmmo.forEach((ammo) => {
      enemies.forEach((enemy) => {
        const enemyCharacter = getComponentsFor(enemy, "character");
        if (testForAABB(ammo, enemyCharacter)) {
          this._generateExplosion(enemy);
          deadEnemiesCounter.increase();
        }
      });
    });
  }

  async _generateExplosion(enemy) {
    const { entities } = game;
    const character = getComponentsFor(enemy, "character");
    const explosion = new ExplosionComponent({
      name: "explosion",
      asset: "explosion",
      config: Config.explosionComponent,
    });
    enemy.attachComponents(explosion);
    await explosion.show(character);
    enemy.deleteComponents(character);
    await explosion.hide();
    enemy.deleteComponents(explosion);
    entities.remove(enemy);
  }
}
