export default class System {
  constructor({ id = crypto.randomUUID() } = {}) {
    this.id = id;
  }

  init() {}

  update() {}
}
