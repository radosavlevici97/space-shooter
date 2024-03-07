import System from "../../core/systems/System";

export default class AbstractMovementSystem extends System (){
    constructor({entity, ...args}) {
        super(args);
        this.entity = entity;
    }

    moveEntityRight(){
        console.error('Method must be overriden');
    }

    moveEntityLeft(){
        console.error('Method must be overriden');
    }

    moveEntityDown(){
        console.error('Method must be overriden');
    }
}