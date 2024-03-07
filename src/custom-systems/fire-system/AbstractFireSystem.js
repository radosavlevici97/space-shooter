import System from "../../core/systems/System";
import {Sprite} from "pixi.js";

export default class AbstractFireSystem extends System {
    constructor(args) {
        super(args);
    }

    fire() {
        console.error('Method must be overriden');
    }

}