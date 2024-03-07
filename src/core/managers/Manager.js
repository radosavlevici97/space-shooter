import { DisplayObject } from "pixi.js";

export default class Manager {
  /**
   * @description - Helper class to help managing all the features instantiated in Scenario.
   * @param {PIXI.Container} container
   * @param {object} settings - Game data settings from the server.
   */
  constructor() {
    this._all = [];
  }

  get all() {
    return this._all;
  }

  /**
   * @description - adds feature/s. Every added feature is available as a getter on the
   * featureManager instance.
   * @param {Entity[]} featuresList - Array of features to be added.
   * @public
   */
  add(featuresList) {
    Object.keys(featuresList).forEach((name) => {
      if (this[name]) {
        // eslint-disable-next-line no-console
        console.error(
          `Feature with name "${name}" has already been added, check for redundant calls`
        );
      } else {
        const feature = featuresList[name];
        feature.name = name;

        Object.defineProperty(this, name, {
          get() {
            return feature;
          },
        });
        this._all = [feature, ...this._all];
      }
    });
  }

  /**
   * @description Removes features
   * @param {string} list List of features
   * @public
   */
  remove(list) {
    if (!Array.isArray(list)) list = [list];

    Object.keys(list).forEach((name) => {
      if (this[name]) {
        // eslint-disable-next-line no-console
        console.error(`Feature "${name}" doesn't exist`);
      } else {
        const feature = list[name];

        this._all = this._all.filter((element) => element !== feature);
      }
    });
  }
}
