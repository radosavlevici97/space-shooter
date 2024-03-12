import System from "../../core/systems/System";
import { game } from "../../Game";
import { getComponentsFor } from "../../Utils";
import { app } from "../../main";
import gsap from "gsap";

export default class EnemyMovementSystem extends System {
  updateEntities() {
    const { entities } = game;
    const enemies = entities.getEntities("enemy", "character");
    console.log(enemies);
    enemies.forEach((enemy) => {
      const character = getComponentsFor(enemy, "character");
      if (!character.isMoving) {
        character.isMoving = true;
        this._loop(character);
      }
    });
  }

  async _loop(character) {
    await this._moveRight(character);
    await this._moveDown(character);
    await this._moveLeft(character);
    await this._moveDown(character);
    this._loop(character);
  }

  async _moveRight(character) {
    const { width: characterWidth } = character.size;
    const { width: screenWidth } = app.renderer.screen;
    const { displayObject } = character;
    await gsap.to(displayObject, {
      x: screenWidth - characterWidth / 2,
      duration: 6,
    });
  }

  async _moveDown(character) {
    const { height: characterHeight } = character.size;
    const { y: characterY } = character.position;
    const { displayObject } = character;
    await gsap.to(displayObject, {
      y: characterY + characterHeight,
      duration: 1,
    });
  }

  async _moveLeft(character) {
    const { width: characterWidth } = character.size;
    const { displayObject } = character;
    await gsap.to(displayObject, { x: characterWidth / 2, duration: 6 });
  }
}
