import AbstractFireSystem from "./AbstractFireSystem";

export default class EnemyFireSystem extends AbstractFireSystem{
    fire(){

    }
}





//export default class PlayerFireSystem extends Container{
    // protected player:Player;
    // protected laser:Container;
    //
    // constructor(player:Player) {
    //     super();
    //     this.player=player;
    //     this.initLaser();
    // }
    //
    //
    //
    // public animateMissle(pointerX:number, pointerY:number):void {
    //     let checkY:number = pointerY - this.player.mainCharacter.y;
    //     if(checkY<-200) {
    //         const _missle: Sprite = Sprite.from('./assets/images/rocket.png');
    //         _missle.anchor.set(0.5);
    //         _missle.x = this.player.mainCharacter.x;
    //         _missle.y = this.player.mainCharacter.y;
    //         //we find the angle of rotation that the rocket must have, determining the angle between the mouse and the player, by the arctangent formula arctg(y2-y1,x2-x1) plus PI/2 as an offset
    //         _missle.rotation = Math.atan2(pointerY - _missle.y, pointerX - _missle.x) + Math.PI / 2;
    //         MissleDetector.playerMissles.push(_missle);
    //         this.addChild(_missle);
    //         //we know the coordinates of two points on a line. We find the slope:(y2-y1/x2-x1) of the line and we can find the coordinates of the third point so that the 3 points are collinear
    //         let m = (pointerY - this.player.mainCharacter.y) / (pointerX - this.player.mainCharacter.x);
    //         //we check if the equation of the line is correct y2-y1=m(x2-x1)
    //         console.log(pointerY - this.player.mainCharacter.y == m * (pointerX - this.player.mainCharacter.x));
    //         let y3 = -500;
    //         //we calculate the coordinates of the third point through the equation of the line: x2 = (y2-y1+m*x1)/m
    //         let x3 = (y3 - pointerY + m * pointerX) / m;
    //         gsap.to(_missle, {
    //             x: x3,
    //             y: y3,
    //             onComplete: this.missleGarbage.bind(this, [_missle])
    //         });
    //     }
    // }
    //
    // protected initLaser():void {
    //     const laser:Graphics = new Graphics();
    //     laser.lineStyle(5, 0xAA0114 );
    //     laser.lineTo(0, -3*this.player.mainCharacter.y);
    //     laser.x = this.player.mainCharacter.x;
    //     laser.y = this.player.mainCharacter.y;
    //     laser.alpha=0.4;
    //     this.laser = new Container();
    //     this.laser.addChild(laser);
    //     this.laser.x= this.player.mainCharacter.x;
    //     this.laser.y = this.player.mainCharacter.y;
    //     this.laser.pivot.set(this.player.mainCharacter.x, this.player.mainCharacter.y);
    //     this.addChild(this.laser);
    //
    // }
    //
    // public rotateLaser(pointerX, pointerY):void {
    //     const rotation = Math.atan2(pointerY - this.player.mainCharacter.y, pointerX - this.player.mainCharacter.x) + Math.PI / 2;
    //     this.laser.angle=rotation*180/Math.PI;
    // }
    //
    // public get getlaser(){
    //     return this.laser;
    // }
    // protected missleGarbage(missle:Sprite[]):void{
    //     this.removeChild(missle[0]);
    // }
//}