export default class Entity {
  constructor({ name = "Entity", components = [], config = null }) {
    this.id = crypto.randomUUID();
    this.name = name;
    this._components = components;
    this.config = config;
  }

  attachComponents(...components) {
    this._components = [...this._components, ...components];
  }

  deleteComponents(...components) {
    components.forEach((component) => component.delete());
    this._components = this._components.filter(
      (component) => !components.includes(component)
    );
  }

  deleteAllComponents() {
    this._components.forEach((component) => component.delete());
    this._components = [];
  }

  getComponents() {
    return this._components;
  }
}
