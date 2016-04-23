/**
 * Created by alex on 23/04/2016.
 */

class vehiculo extends Phaser.Sprite{

    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);

        // Activamos las fisicas
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.body.allowGravity = false;

    }
}
