import RenderableComponent from "../core/components/RenderableComponent";

export default class RocketLauncherComponent extends RenderableComponent {
    constructor({rocketSource,...args}) {
        super(args);
        this._rocketSource = rocketSource;
        this._rockets = [];
    }

    spawnRocket(){

    }

    rocketGarbage(rocket) {

    }
}