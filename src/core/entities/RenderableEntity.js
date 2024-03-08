import Entity from "./Entity";

export default class RenderableEntity extends Entity {
  constructor({ name = "Entity", components = [], container = null }) {
    super({ name, components });
    this.container = container;
  }

  attachComponents(...components) {
    super.attachComponents(...components);
    const componentsToDisplay = components
      .filter((component) => component.displayObject && component.attachable)
      .map((component) => component.displayObject);

    this.container &&
      componentsToDisplay.length &&
      this.container.addChild(...componentsToDisplay);
  }

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
