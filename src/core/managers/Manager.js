import { Container } from "pixi.js";

export default class Manager {
  /**
   * @description - Helper class to help managing all the features instantiated in Scenario.
   * @param {PIXI.Container} container
   * @param {object} settings - Game data settings from the server.
   */
  constructor(container, settings) {
    this.container = container;
    this._all = [];
    this.settings = settings;
  }

  get all() {
    return this._all;
  }

  /**
   * @description - adds feature/s. Every added feature is available as a getter on the
   * featureManager instance.
   * @param {PIXI.Container[]} featuresList - Array of features to be added.
   * @param {PIXI.Container} container - The container the feature will be added to.
   * @public
   */
  add(featuresList, { container = this.container } = {}) {
    Object.keys(featuresList).forEach((name) => {
      if (this[name]) {
        // eslint-disable-next-line no-console
        console.error(
          `Feature with name "${name}" has already been added, check for redundant calls`
        );
      } else {
        const feature = featuresList[name];
        const featureContainer = feature?.container;
        feature.name = name;

        if (container && featureContainer) {
          container.addChild(featureContainer);
        }

        Object.defineProperty(this, name, {
          get() {
            return feature;
          },
          configurable: true,
        });
        this._all = [feature, ...this._all];
      }
    });
  }

  /**
   * @description Removes features
   * @param {string} list List of features
   * @param {PIXI.Container} container The parent container
   * @public
   */
  remove(list, container = this.container) {
    if (!Array.isArray(list)) list = [list];

    Object.keys(list).forEach((name) => {
      if (this[name]) {
        // eslint-disable-next-line no-console
        console.error(`Feature "${name}" doesn't exist`);
      } else {
        const feature = list[name];
        const featureContainer = feature?.container;

        if (featureContainer) {
          featureContainer.destroy();
          container.removeChild(featureContainer);
        }

        feature?.delete();
        this._all = this._all.filter((element) => element !== feature);
        delete this[`${feature.name}`];
      }
    });
  }
}
