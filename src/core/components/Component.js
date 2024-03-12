export default class Component {
  constructor({ name = "Component", config, id = crypto.randomUUID() }) {
    this.id = id;
    this.isDeleted = false;
    this.name = name;
    this.config = config;
  }

  delete() {
    this.isDeleted = true;
  }
}
