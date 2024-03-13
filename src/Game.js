import { Container, Sprite, Rectangle } from "pixi.js";
import EntityManager from "./core/managers/EntityManager";
import Manager from "./core/managers/Manager";
import { Text } from "pixi.js";
import PlayerCharacter from "./custom-components/characters/PlayerCharacter";
import RenderableEntity from "./core/entities/RenderableEntity";
import EnemyFireSystem from "./custom-systems/fire-system/EnemyFireSystem";
import LaserComponent from "./custom-components/LaserComponent";
import PlayerFireSystem from "./custom-systems/fire-system/PlayerFireSystem";
import EnemyGeneratorSystem from "./custom-systems/EnemiesGeneratorSystem";
import BackgroundSystem from "./custom-systems/BackgroundSystem";
import PlayerMovementSystem from "./custom-systems/movement-system/PlayerMovementSystem";
import WeaponComponent from "./custom-components/WeaponComponent";
import EnemyMovementSystem from "./custom-systems/movement-system/EnemyMovementSystem";
import CounterComponent from "./custom-components/CounterComponent";
import CollisionSystem from "./custom-systems/CollisionSystem";

class Game {
  constructor() {
    this._hitArea = new Rectangle();
    this.hitContainer = new Container();
    this.hitContainer.eventMode = "static";
    this.hitContainer.interactive = true;
    this.hitContainer.hitArea = this._hitArea;
  }

  /**
   * @description Setup the initial components, entities and systems
   * @param {object} config Game config
   * @param {Container} container The main container of the game which right now is app.stage.
   * @public
   */
  init(config, container) {
    this.entities = new EntityManager(container, config);
    this.systems = new Manager(null, config);
    container.addChild(this.hitContainer);

    const playerCharacterComponent = new PlayerCharacter({
      displayObjectSource: Sprite,
      name: "character",
      asset: "shooter",
      config: config.playerComponent,
    });

    const counterComponent = new CounterComponent({
      name: "counter",
      displayObjectSource: Text,
      config: config.counterComponent,
    });

    const laserComponent = new LaserComponent({
      name: "laser",
      config: config.laserComponent,
    });

    const playerWeaponComponent = new WeaponComponent({
      name: "weapon",
      ammoAsset: "rocket",
      config: config.playerWeaponComponent,
    });

    this.addEntities({
      player: new RenderableEntity({
        name: "player",
        container: new Container(),
      }),
    });

    this.addEntities({
      background: new RenderableEntity({
        name: "background",
        container: new Container(),
      }),
      foreground: new RenderableEntity({
        name: "foreground",
        container: new Container(),
      }),
    });

    this.addSystems({
      enemyFireSystem: new EnemyFireSystem(),
      enemyMovementSystem: new EnemyMovementSystem(),
      playerFireSystem: new PlayerFireSystem(),
      playerMovementSystem: new PlayerMovementSystem(),
      enemyGeneratorSystem: new EnemyGeneratorSystem(),
      backgroundSystem: new BackgroundSystem(),
      missleDetectorSystem: new CollisionSystem(),
    });

    this.entities.player.attachComponents(
      playerCharacterComponent,
      playerWeaponComponent,
      laserComponent
    );
    this.entities.foreground.attachComponents(counterComponent);
  }

  /**
   * @description Adds entities
   * @param {object} entitiesList A list of entities to add
   * @param {object} options
   * @public
   */
  addEntities(entitiesList, options) {
    this.entities.add(entitiesList, options);
  }

  /**
   * @description Adds systems
   * @param {object} systemsList A list of systems to add
   * @param {object} options
   * @public
   */
  addSystems(systems, options) {
    this.systems.add(systems, options);
  }

  /**
   * @description Start the game ticker and execute all systems.
   * @param {object} ticker Pixijs ticker
   * @public
   */
  startGameLoop(ticker) {
    ticker.add((time) => {
      this.systems.all.forEach((system) => {
        system?.update(time);
      });
    });
  }

  /**
   * @description Resize the hit area
   * @param {number} width Width
   * @param {number} height Height
   * @public
   */
  resize(width, height) {
    this._hitArea.x = 0;
    this._hitArea.y = 0;
    this._hitArea.width = width;
    this._hitArea.height = height;
  }
}
export const game = new Game();
