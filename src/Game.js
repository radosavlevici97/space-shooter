import RenderableComponent from "./core/components/RenderableComponent";
import { Container, Sprite } from "pixi.js";
import EntityManager from "./core/managers/EntityManager";
import Manager from "./core/managers/Manager";
import TextComponent from "./core/components/TextComponent";
import BackgroundStar from "./custom-components/background/BackgroundStar";
import PlayerCharacter from "./custom-components/characters/PlayerCharacter";
import EnemyCharacter from "./custom-components/characters/EnemyCharacter";
import BackgroundPhysics from "./custom-components/background/BackgroundPhysics";
import EnemyFireSystem from "./custom-systems/fire-system/EnemyFireSystem";
import LaserComponent from "./custom-components/LaserComponent";
import PlayerFireSystem from "./custom-systems/fire-system/PlayerFireSystem";
import RocketLauncherComponent from "./custom-components/RocketLauncherComponent";
import Config from "./Config";
import EnemyGeneratorSystem from "./custom-systems/EnemiesGeneratorSystem";

class Game {
  constructor() {
    this.entities = null;
  }

  init(config, container) {
    this.entities = new EntityManager(container, config);
    this.systems = new Manager(null, config);

    const playerCharacterComponent = new PlayerCharacter({
      displayObjectSource: Sprite,
      name: "characterComponent",
      asset: "shooter",
      config: Config.playerComponent,
    });

    const backgroundDisplayObjectComponent = new BackgroundStar({
      name: "starComponent",
      displayObjectSource: Sprite,
      asset: "star",
    });

    const backgroundPhysicsComponent = new BackgroundPhysics({
      name: "physicsComponent",
      config: Config.backgroundPhysics,
    });

    const counterComponent = new TextComponent({
      name: "textComponent",
    });

    const laserComponent = new LaserComponent({
      name: "laserComponent",
      config: Config.laserComponent,
    });

    const playerRocketLauncherComponent = new RocketLauncherComponent({
      name: "rocketLauncher",
      rocketAsset: "rocket",
      config: Config.rocketLauncher,
    });

    const playerElementsContainer = new RenderableComponent({
      name: "elementsContainer",
      config: Config.playerElementsContainer,
    });
    const backgroundElementsContainer = new RenderableComponent({
      name: "elementsContainer",
      config: Config.backgroundElementsContainer,
    });
    const foregroundElementsContainer = new RenderableComponent({
      name: "elementsContainer",
      config: Config.foregroundElementsContainer,
    });

    this.addEntities({
      player: new Entity({
        name: "Player",
        components: [
          playerCharacterComponent,
          playerRocketLauncherComponent,
          laserComponent,
          playerElementsContainer,
        ],
        config: Config.player,
      }),
    });

    this.addEntities({
      background: new Entity({
        name: "Background",
        components: [
          backgroundDisplayObjectComponent,
          backgroundPhysicsComponent,
          backgroundElementsContainer,
        ],
        config: Config.background,
      }),
      foreground: new Entity({
        name: "Foreground",
        components: [counterComponent, foregroundElementsContainer],
        config: Config.foreground,
      }),
    });

    this.addSystems({
      enemyFireSystem: new EnemyFireSystem(),
      playerFireSystem: new PlayerFireSystem(),
      enemyGeneratorSystem: new EnemyGeneratorSystem(),
    });
  }

  /**
   * @description Adds features
   * @param {object} featuresList A list of features to add
   * @param {object} options
   * @public
   */
  addEntities(featuresList, options) {
    this.entities.add(featuresList, options);
  }

  addSystems(systems, options) {
    this.systems.add(systems, options);
  }

  startGameLoop(ticker) {
    console.log(this.entities);
    ticker.add(() => {
      this.systems.all.forEach((system) => {
        system?.update();
      });
    });
  }
}
export const game = new Game();
