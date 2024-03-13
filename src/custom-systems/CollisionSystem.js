import { getComponentsFor, testForAABB } from "../Utils";
import System from "../core/systems/System";
import { game } from "../Game";
import ExplosionComponent from "../custom-components/ExplosionComponent";
import config from "../Config";
import { Sprite } from "pixi.js";

export default class CollisionSystem extends System {
  constructor(args) {
    super(args);
    this._deadPlayersFiredAmmo = [];
  }

  /**
   * @description Check the player and enemies collision.
   * Cleans the fired ammo array
   * @param {object} time pixijs ticker's time
   * @public
   */
  update(time) {
    this._playerColission();
    this._enemyColission();
    this._clean();
  }

  /**
   * @description Filter the deadPlayersFiredAmmo by removing the destroyed ammo
   * @private
   */
  _clean() {
    this._deadPlayersFiredAmmo = this._deadPlayersFiredAmmo.filter(
      (ammo) => !ammo.destroyed
    );
  }

  /**
   * @description Check the collision between player and the enemies's ammo.
   * @private
   */
  _playerColission() {
    const { entities } = game;
    const enemiesWithWeapons = entities.getEntities("enemy", "weapon");
    const { player } = entities;
    const playerCharacter = getComponentsFor(player, "character");
    const { displayObject: playerDisplayObject } = playerCharacter;

    enemiesWithWeapons.forEach((enemy) => {
      const enemyWeapon = getComponentsFor(enemy, "weapon");
      const { firedAmmo: enemyFiredAmmo } = enemyWeapon;

      enemyFiredAmmo.forEach((ammo) => {
        if (!(!ammo.destroyed && testForAABB(ammo, playerDisplayObject)))
          return;

        window.alert("game finished! please refresh the page");
      });
    });

    this._deadPlayersFiredAmmo.forEach((ammo) => {
      if (!(!ammo.destroyed && testForAABB(ammo, playerDisplayObject))) return;

      window.alert("game finished! please refresh the page");
    });
  }

  /**
   * @description Check the collision between enemies and the player's ammo
   * @private
   */
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

        if (!testForAABB(ammo, enemyDisplayObject)) return;

        this._generateExplosion(enemy, playerWeapon, ammo);
        deadEnemiesCounter.increase();
      });
    });
  }

  /**
   * @description Clean the enemies out of screen.
   * Change background mode
   * @param {object} enemy enemy shooted
   * @param {object} playerWeapon the player's weapon
   * @param {Sprite} ammo the ammo fired by player
   * @private
   */
  async _generateExplosion(enemy, playerWeapon, ammo) {
    const { entities } = game;
    const character = getComponentsFor(enemy, "character");
    const enemyWeapon = getComponentsFor(enemy, "weapon");

    const explosion = new ExplosionComponent({
      displayObjectSource: Sprite,
      name: "explosion",
      asset: "explosion",
      config: config.explosionComponent,
    });

    enemy.attachComponents(explosion);
    playerWeapon.destroyFiredAmmo(ammo);
    enemy.delete();

    const { firedAmmo } = enemyWeapon;
    this._deadPlayersFiredAmmo = [...this._deadPlayersFiredAmmo, ...firedAmmo];

    await explosion.show(character);
    await explosion.hide(character);

    entities.remove(enemy);
  }
}
