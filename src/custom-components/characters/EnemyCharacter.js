import RenderableComponent from "../../core/components/RenderableComponent";


export default class EnemyCharacter extends RenderableComponent {

    init() {
        this.displayObject.anchor.set(0.5);
        this.displayObject.rotation = Math.PI;
        this.displayObject.x = this.displayObject.width / 2;
        this.displayObject.y = this.displayObject.height / 2;
    }
}