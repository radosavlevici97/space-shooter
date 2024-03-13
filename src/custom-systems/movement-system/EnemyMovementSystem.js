import System from "../../core/systems/System";
import { game } from "../../Game";
import { getComponentsFor } from "../../Utils";
import { app } from "../../main";
import gsap from "gsap";
import config from "../../Config";

export default class EnemyMovementSystem extends System {
  /**
   * @description Start the movement loop for the new enetities added in the game
   * @public
   */
  updateEntities() {
    const { entities } = game;
    const enemies = entities.getEntities("enemy", "character");

    enemies.forEach((enemy) => {
      const character = getComponentsFor(enemy, "character");

      if (character.isMoving) return;

      character.isMoving = true;
      this._loop(enemy, character);
    });
  }

  /**
   * @description Movement loop function. Is intrerupted when the entity is deleted
   * @param {object} enemy enemy shooted
   * @param {object} character the enemy's character
   * @private
   */
  async _loop(enemy, character) {
    if (enemy.isDeleted) return;

    await this._moveRight(character);
    await this._moveDown(character);
    await this._moveLeft(character);
    await this._moveDown(character);

    this._loop(enemy, character);
  }

  /**
   * @description Move the player to the right
   * @param {object} character the enemy's character
   * @private
   */
  async _moveRight(character) {
    const { width: characterWidth } = character.size;
    const { width: screenWidth } = app.renderer.screen;
    const { enemiesMovementSlowness } = config.game;

    await gsap.to(character.position, {
      x: screenWidth - characterWidth / 2,
      duration: enemiesMovementSlowness,
    });
  }

  /**
   * @description Move the player down
   * @param {object} character the enemy's character
   * @private
   */
  async _moveDown(character) {
    const { height: characterHeight } = character.size;
    const { y: characterY } = character.position;

    await gsap.to(character.position, {
      y: characterY + characterHeight,
      duration: 1,
    });
  }

  /**
   * @description Move the player to the left
   * @param {object} character the enemy's character
   * @private
   */
  async _moveLeft(character) {
    const { width: characterWidth } = character.size;
    const { enemiesMovementSlowness } = config.game;

    await gsap.to(character.position, {
      x: characterWidth / 2,
      duration: enemiesMovementSlowness,
    });
  }
}
