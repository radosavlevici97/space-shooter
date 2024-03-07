import Manager from "./Manager";

export default class EntityManager extends Manager {
    /**
     * @description - arranges all added features according to the passed array of features names;
     * All the feature not in the 'list' are put behind the ones in the list.
     * @param {string} list List of features
     * @param {PIXI.Container} container The container, that will be sorted.
     * @public
     */
    arrange(list, container = this.container) {
        const featuresList = list.map(name => this[name]);
        container.children = container.children.sort((a, b) => {
            // NOTE: the features not presented in the passed list will be put at the beginning
            // of the array, visually they will be behind everything
            if (!featuresList.includes(a) && !featuresList.includes(b)) return 0;
            if (!featuresList.includes(a)) return -1;
            if (!featuresList.includes(b)) return 1;

            return featuresList.indexOf(a) - featuresList.indexOf(b);
        });
    }

}
