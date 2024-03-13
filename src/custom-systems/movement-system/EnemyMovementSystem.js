import System from "../../core/systems/System";
import { game } from "../../Game";
import { getComponentsFor } from "../../Utils";
import { app } from "../../main";
import gsap from "gsap";

export default class EnemyMovementSystem extends System {
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

  async _loop(enemy, character) {
    if (enemy.isDeleted) return;

    await this._moveRight(character);
    await this._moveDown(character);
    await this._moveLeft(character);
    await this._moveDown(character);

    this._loop(enemy, character);
  }

  async _moveRight(character) {
    const { width: characterWidth } = character.size;
    const { width: screenWidth } = app.renderer.screen;

    await gsap.to(character.position, {
      x: screenWidth - characterWidth / 2,
      duration: 6,
    });
  }

  async _moveDown(character) {
    const { height: characterHeight } = character.size;
    const { y: characterY } = character.position;

    await gsap.to(character.position, {
      y: characterY + characterHeight,
      duration: 1,
    });
  }

  async _moveLeft(character) {
    const { width: characterWidth } = character.size;

    await gsap.to(character.position, { x: characterWidth / 2, duration: 6 });
  }
}
