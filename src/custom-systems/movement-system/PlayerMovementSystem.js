import { game } from "../../Game";
import { app } from "../../main";
import Keyboard from "pixi.js-keyboard";
import { getComponentsFor } from "../../Utils";
import System from "../../core/systems/System";
import config from "../../Config";

export default class PlayerMovementSystem extends System {
  constructor(args) {
    super(args);
    this.init();
  }

  /**
   * @description Init the system.
   * @public
   */
  init() {
    const { hitContainer } = game;
    this._addEvents(hitContainer);
  }

  /**
   * @description Attach the listeners.
   * @private
   */
  _addEvents(container) {
    container.on("rightclick", (e) => {
      const { player } = game.entities;
      this._moveToX(player, e.clientX);
    });
  }

  /**
   * @description Update the keyboard and attach the callbacks
   * @public
   */
  update() {
    const { player } = game.entities;

    if (Keyboard.isKeyDown("ArrowLeft", "KeyA")) this._moveLeft(player);
    if (Keyboard.isKeyDown("ArrowRight", "KeyD")) this._moveRight(player);

    if (Keyboard.isKeyDown("ArrowUp", "KeyW")) this._moveUp(player);
    if (Keyboard.isKeyDown("ArrowDown", "KeyS")) this._moveDown(player);

    Keyboard.update();
  }

  /**
   * @description Moves the player to the right
   * @param {object} entity
   * @private
   */
  _moveRight(entity) {
    const { width: screenWidth } = app.renderer.screen;
    const character = getComponentsFor(entity, "character");
    const { width: characterWidth } = character.size;
    const { x: characterX } = character.position;
    const { playerMovementSpeed } = config.game;

    if (!(characterX < screenWidth - characterWidth / 2)) return;

    this._updateComponents(entity, { x: playerMovementSpeed });
  }

  /**
   * @description Moves the player to the left
   * @param {object} entity
   * @private
   */
  _moveLeft(entity) {
    const character = getComponentsFor(entity, "character");
    const { width: characterWidth } = character.size;
    const { x: characterX } = character.position;
    const { playerMovementSpeed } = config.game;

    if (!(characterX > characterWidth / 2)) return;

    this._updateComponents(entity, { x: -playerMovementSpeed });
  }

  /**
   * @description Moves the player up
   * @param {object} entity
   * @private
   */
  _moveUp(entity) {
    const character = getComponentsFor(entity, "character");
    const { height: screenHeight } = app.renderer.screen;
    const { y: characterY } = character.position;
    const { playerMovementSpeed } = config.game;

    if (!(characterY > screenHeight / 1.5)) return;

    this._updateComponents(entity, { y: -playerMovementSpeed });
  }

  /**
   * @description Moves the player down
   * @param {object} entity
   * @private
   */
  _moveDown(entity) {
    const character = getComponentsFor(entity, "character");
    const { height: screenHeight } = app.renderer.screen;
    const { y: characterY } = character.position;
    const { height: characterHeight } = character.size;
    const { playerMovementSpeed } = config.game;

    if (!(characterY < screenHeight - characterHeight / 2)) return;

    this._updateComponents(entity, { y: playerMovementSpeed });
  }

  /**
   * @description Moves the player to x position
   * @param {object} entity
   * @param {number} x position to move
   * @private
   */
  _moveToX(entity, x) {
    this._updateComponents(entity, { x }, { reset: true });
  }

  /**
   * @description Updates the position of the components
   * @param {object} entity
   * @param {object} data
   * @param {object} options
   * @private
   */
  _updateComponents(entity, data, options) {
    const laser = getComponentsFor(entity, "laser");
    const character = getComponentsFor(entity, "character");

    character.updatePosition(data, options);
    laser.updatePosition(data, options);
  }
}
