import Manager from "./Manager";
import { getComponentsFor } from "../../Utils";
export default class EntityManager extends Manager {
  /**
   * @description - arranges all added entities according to the passed array of entities names;
   * All the entity not in the 'list' are put behind the ones in the list.
   * @param {string} list List of entities
   * @param {Container} container The container, that will be sorted.
   * @public
   */
  arrange(list, container = this.container) {
    const entitiesList = list.map((name) => this[name]);
    container.children = container.children.sort((a, b) => {
      // NOTE: the entities not presented in the passed list will be put at the beginning
      // of the array, visually they will be behind everything
      if (!entitiesList.includes(a) && !entitiesList.includes(b)) return 0;
      if (!entitiesList.includes(a)) return -1;
      if (!entitiesList.includes(b)) return 1;

      return entitiesList.indexOf(a) - entitiesList.indexOf(b);
    });
  }

  getEntities(entitiesName, componentsNamesList) {
    if (!Array.isArray(componentsNamesList))
      componentsNamesList = [componentsNamesList];

    const entities = entitiesName
      ? this.all.filter((entitie) => entitie.name.includes(entitiesName))
      : this.all;

    if (!componentsNamesList) return entities;

    return entities.filter(
      (entitie) =>
        !componentsNamesList
          .map((name) => {
            const components = getComponentsFor(entitie, name);
            return components?.length || components;
          })
          .includes(false)
    );
  }
}
