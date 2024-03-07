import Entity from "./Entity";

export default class RenderableEntity extends Entity {
  constructor({ name = "Entity", components = [], container = null }) {
    super({ name, components });
    this.container = container;
  }

  attachComponents(...components) {
    super.attachComponents(components);
    console.log(this.container);
    console.log(components);
    console.log(
      ...components.filter(
        (component) => component.displayObject && component.attachable
      )
    );
    this.container &&
      this.container.addChild(
        ...components
          .filter(
            (component) => component.displayObject && component.attachable
          )
          .map((component) => component.displayObject)
      );
  }

  deleteComponents(...components) {
    super.deleteComponents(components);
    this.container &&
      this.container.removeChild(
        ...components
          .filter(
            (component) => component.displayObject && component.attachable
          )
          .map((component) => component.displayObject)
      );
  }

  deleteAllComponents() {
    super.deleteAllComponents();
    this.container.removeChildren();
  }
}
