import System from "../core/systems/System";

export default class BackgroundSystem extends System {


    // update() {
    //     // Simple easing. This should be changed to proper easing function when used for real.
    //     this.speed += (this.warpSpeed - this.speed) / 20;
    //     this.cameraZ += delta * 10 * (this.speed + this.baseSpeed);
    //     for (let i = 0; i < this.starAmount; i++) {
    //         const star = this.stars[i];
    //         if (star.z < this.cameraZ) this.randomizeStar(star, false);
    //
    //         // Map star 3d position to 2d with really simple projection
    //         const z = star.z - this.cameraZ;
    //         star.sprite.x = star.x * (this.fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.width / 2;
    //         star.sprite.y = star.y * (this.fov / z) * this.app.renderer.screen.width + this.app.renderer.screen.height / 2;
    //
    //         // Calculate star scale & rotation.
    //         const dxCenter = star.sprite.x - this.app.renderer.screen.width / 2;
    //         const dyCenter = star.sprite.y - this.app.renderer.screen.height / 2;
    //         const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
    //         const distanceScale = Math.max(0, (2000 - z) / 2000);
    //         star.sprite.scale.x = distanceScale * this.starBaseSize;
    //         // Star is looking towards center so that y axis is towards center.
    //         // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
    //         star.sprite.scale.y = distanceScale * this.starBaseSize + distanceScale * this.speed * this.starStretch * distanceCenter / this.app.renderer.screen.width;
    //         star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    //     }
    // }
}