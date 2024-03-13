import { game } from "../Game";
import {
  consecutiveNumbersGenerator,
  getComponentsFor,
  randomFromInterval,
  testForAABB,
  delay,
} from "../Utils";
import System from "../core/systems/System";
import RenderableEntity from "../core/entities/RenderableEntity";
import { app } from "../main";
import WeaponComponent from "../custom-components/WeaponComponent";
import EnemyCharacter from "../custom-components/characters/EnemyCharacter";
import { Sprite, Container } from "pixi.js";
import config from "../Config";

export default class EnemyGeneratorSystem extends System {
  constructor(args) {
    super(args);
    this._idGenerators = consecutiveNumbersGenerator(0);
    this._generateEnemies();
  }
  /**
   * @description Generates enemies entities and their components and add them into game.
   * This operates in a loop, continuously generating enemies at regular intervals specified in the configuration, with each generation occurring after a random number of seconds."
   * The movement and the fire system are called to fetch the new enemies created.
   * @private
   */
  async _generateEnemies() {
    const { enemiesGenerationInterval } = config.game;
    await delay(randomFromInterval(...enemiesGenerationInterval));

    const id = this._idGenerators.next().value;

    const enemyCharacterComponent = new EnemyCharacter({
      displayObjectSource: Sprite,
      name: "character",
      asset: "enemy",
      config: config.enemyComponent,
    });
    const enemyWeaponComponent = new WeaponComponent({
      name: "weapon",
      ammoAsset: "rocket",
      config: config.enemyWeaponComponent,
    });
    const entities = {};
    const entity = new RenderableEntity({
      name: `enemy${id}}`,
      container: new Container(),
    });

    entities[`enemy${id}`] = entity;
    game.addEntities(entities);
    entity.attachComponents(enemyCharacterComponent, enemyWeaponComponent);

    const movementSystem = game.systems.enemyMovementSystem;
    const fireSystem = game.systems.enemyFireSystem;

    movementSystem.updateEntities();
    fireSystem.updateEntities();

    this._generateEnemies();
  }

  /**
   * @description Clean the enemies out of screen.
   * Change background mode
   * @public
   */
  update(time) {
    const { screen } = app.renderer;
    const { entities } = game;
    const enemies = entities.getEntities("enemy");
    const { background } = game.entities;
    const backgroundPhysicsComponent = getComponentsFor(background, "physics");

    if (!enemies?.length) {
      backgroundPhysicsComponent.increaseWarpSpeed();
      return;
    }
    backgroundPhysicsComponent.decreaseWarpSpeed();

    this._cleanEntities(enemies, screen);
  }

  /**
   * @description Clean the enemies out of screen.
   * Change background mode
   * @param {object} entities entities to check if they are out of the screen or not
   * @param {Container} screen the screen container
   * @private
   */
  _cleanEntities(entities, screen) {
    entities.forEach((entity) => {
      const character = getComponentsFor(entity, "character");

      if (!character) return;

      const { displayObject: characterDisplay } = character;

      if (testForAABB(characterDisplay, screen)) return;

      game.entities.remove(entity);
    });
  }
}
