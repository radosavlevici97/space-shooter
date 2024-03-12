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

  async _generateEnemies() {
    await delay(randomFromInterval(1, 3));
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
    movementSystem.updateEntities();
    this._generateEnemies();
  }

  update(time) {
    const { entities } = game;
    const enemies = entities.getEntities("enemy");
    const { screen } = app.renderer;
    enemies.forEach((enemy) => {
      const { displayObject: characterDisplay } = getComponentsFor(
        enemy,
        "character"
      );
      if (!testForAABB(characterDisplay, screen)) {
        game.entities.remove(enemy);
      }
    });
  }
}
