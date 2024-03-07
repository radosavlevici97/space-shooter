import {Container, Graphics, Sprite} from "pixi.js";
import gsap from 'gsap';
import AbstractFireSystem from "./AbstractFireSystem";



export default class EnemyFireSystem extends AbstractFireSystem{
    fire(){

    }
}
//
//
//
//
//
//
//
//
//
//
//
//
//
// export default class EnemyireSystem extends Container{
//     protected enemie:Enemie;
//     protected _missle:Sprite;
//
//     constructor(enemie:Enemie) {
//         super();
//         this.enemie=enemie;
//         this.initFireSystem();
//     }
//
//
//     protected initFireSystem(): Promise<void> {
//         return new Promise<void>((resolve, reject) => {
//             gsap.delayedCall(Util.randomFromInterval(3,6),()=>{
//                 this.animateMissle();
//                 resolve();
//             })
//         }).then(()=>{
//             this.initFireSystem();
//         });
//     }
//     protected animateMissle():void {
//         this._missle = Sprite.from('./assets/images/rocket.png');
//         this._missle.anchor.set(0.5);
//         this._missle.rotation = Math.PI;
//         this._missle.x = this.enemie.mainCharacter.x;
//         this._missle.y = this.enemie.mainCharacter.y;
//         MissleDetector.enemiesMissles.push(this._missle);
//         this.addChild(this._missle);
//         gsap.to(this._missle, {
//             y:Names.Misc.GAME_HEIGHT*2,
//             duration:10,
//             onComplete:()=>{
//                 this.missleGarbage.bind(this, [this._missle]);
//             }
//         });
//     }
//
//
//     protected missleGarbage(missle:Sprite[]):void{
//         this.removeChild(missle[0]);
//     }
//
//     public get missle():Sprite{
//         return this._missle;
//     }
// }