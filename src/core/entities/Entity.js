export default class Entity {
  constructor({ name = "Entity", components = [], id = crypto.randomUUID() }) {
    this.id = id;
    this.name = name;
    this.components = components;
    this._isDeleted = false;
  }

  get isDeleted() {
    return this._isDeleted;
  }

  delete() {
    this._isDeleted = true;
  }

  attachComponents(...components) {
    this.components = [...this.components, ...components];
  }

  deleteComponents(...components) {
    components.forEach((component) => component.delete());
    this.components = this.components.filter(
      (component) => !components.includes(component)
    );
  }

  deleteAllComponents() {
    this.components.forEach((component) => component.delete());
    this.components = [];
  }

  getComponents() {
    return this.components;
  }
}
