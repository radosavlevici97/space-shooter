import { game } from "../../Game";
import { app } from "../../main";
import Keyboard from "pixi.js-keyboard";
import { getComponentsFor } from "../../Utils";
import System from "../../core/systems/System";

export default class PlayerMovementSystem extends System {
  constructor(args) {
    super(args);
    this.init();
  }

  init() {
    const { hitContainer } = game;
    this.addEvents(hitContainer);
  }

  addEvents(container) {
    console.log(container);
    container.on("rightclick", (e) => {
      const { player } = game.entities;
      this.moveToX(player, e.clientX);
    });
  }

  update() {
    // Keyboard
    const { player } = game.entities;
    if (Keyboard.isKeyDown("ArrowLeft", "KeyA")) this.moveLeft(player);
    if (Keyboard.isKeyDown("ArrowRight", "KeyD")) this.moveRight(player);

    if (Keyboard.isKeyDown("ArrowUp", "KeyW")) this.moveUp(player);
    if (Keyboard.isKeyDown("ArrowDown", "KeyS")) this.moveDown(player);
    Keyboard.update();
  }

  moveRight(entity) {
    const { width: screenWidth } = app.renderer.screen;
    const character = getComponentsFor(entity, "character");
    const { width: characterWidth } = character.size;
    const { x: characterX } = character.position;
    if (characterX < screenWidth - characterWidth / 2) {
      this._updateComponents(entity, { x: 10 });
    }
  }

  moveLeft(entity) {
    const character = getComponentsFor(entity, "character");
    const { width: characterWidth } = character.size;
    const { x: characterX } = character.position;
    if (characterX > characterWidth / 2) {
      this._updateComponents(entity, { x: -10 });
    }
  }

  moveUp(entity) {
    const character = getComponentsFor(entity, "character");
    const { height: screenHeight } = app.renderer.screen;
    const { y: characterY } = character.position;

    if (characterY > screenHeight / 1.5) {
      this._updateComponents(entity, { y: -10 });
    }
  }
  moveDown(entity) {
    const character = getComponentsFor(entity, "character");
    const { height: screenHeight } = app.renderer.screen;
    const { y: characterY } = character.position;
    const { height: characterHeight } = character.size;
    if (characterY < screenHeight - characterHeight / 2) {
      this._updateComponents(entity, { y: 10 });
    }
  }

  moveToX(entity, x) {
    this._updateComponents(entity, { x }, { reset: true });
  }

  _updateComponents(entity, data, options) {
    const laser = getComponentsFor(entity, "laser");
    const character = getComponentsFor(entity, "character");
    character.updatePosition(data, options);
    laser.updatePosition(data, options);
  }
}
