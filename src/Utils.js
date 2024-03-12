import gsap from "gsap";

export function randomFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Retrieves the value of a specified query parameter from the current URL
 * @param param - the name of the query parameter to retrieve
 * @returns the value of the specified query parameter, or null if it does not exist
 */
export function getUrlParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  return urlParams.get(param);
}

/**
 * @description Gets random integer between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number} Random int.
 */
export function getRandomInt(min, max) {
  return Math.floor(getRandomFloat(min, max + 1));
}

/**
 * @description Gets random float between min and max
 * @param {number} min
 * @param {number} max
 * @returns {number} Random float.
 */
export function getRandomFloat(min, max) {
  return prng() * (max - min) + min;
}

/**
 * @description Returns a promise that resolves when certain amount of time has passed
 * @param {number} seconds
 * @param {Function} callback
 * @returns {Promise} Delay tween.
 */
export function delay(seconds, callback) {
  return gsap.to({ val: 0 }, { duration: seconds, val: 1 }).then(callback);
}

export function testForAABB(object1, object2) {
  if (object1.visible == false || object2.visible == false) {
    return false;
  }
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return (
    bounds1.x < bounds2.x + bounds2.width &&
    bounds1.x + bounds1.width > bounds2.x &&
    bounds1.y < bounds2.y + bounds2.height &&
    bounds1.y + bounds1.height > bounds2.y
  );
}

export function* consecutiveNumbersGenerator(start = 0) {
  let current = start;
  while (true) {
    yield current++;
  }
}

export function getComponentsFor(entitie, componentsName) {
  const components = entitie.components.filter((component) =>
    component.name.includes(componentsName)
  );
  if (components.length <= 1) return components[0];
  else return components;
}
