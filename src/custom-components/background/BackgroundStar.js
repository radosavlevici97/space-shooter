import RenderableComponent from "../../core/components/RenderableComponent";

export default class BackgroundStar extends RenderableComponent{
    init(){
        this.displayObject.anchor.x = 0.5;
        this.displayObject.anchor.y = 0.7;
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }

    updatePosition(){

    }

    randomizeStar(){

    }
}