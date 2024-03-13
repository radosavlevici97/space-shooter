import Entity from "./Entity";

export default class RenderableEntity extends Entity {
  constructor({ name = "Entity", components = [], container = null }) {
    super({ name, components });
    this.container = container;
  }

  /**
   * @description Attach the components if they are attachable. If they have a display object, adds it to container.
   * @param {object} components Componenets to attach
   * @public
   */
  attachComponents(...components) {
    super.attachComponents(...components);
    const componentsToDisplay = components
      .filter((component) => component.displayObject && component.attachable)
      .map((component) => component.displayObject);
    this.container &&
      componentsToDisplay.length &&
      this.container.addChild(...componentsToDisplay);
  }

  /**
   * @description Delete the components if they are attachable. If they have a display object, removes it to container.
   * @param {object} components Componenets to attach
   * @public
   */
  deleteComponents(...components) {
    super.deleteComponents(...components);
    const componentsToRemoveFromDisplay = components
      .filter((component) => component.displayObject && component.attachable)
      .map((component) => component.displayObject);
    this.container &&
      componentsToRemoveFromDisplay.length &&
      this.container.removeChild(...componentsToRemoveFromDisplay);
  }

  deleteAllComponents() {
    super.deleteAllComponents();
    this.container.removeChildren();
  }
}
