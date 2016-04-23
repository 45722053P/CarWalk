/**
 * Created by alex on 23/04/2016.
 */

class CarWalk {

    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(598, 450, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}
