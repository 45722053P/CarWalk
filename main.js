/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.ACCELERATION = 100;
        this.COCHE_MAX_VELOCITY = 400;
        this.LIVES = 3;
        this.TEXT_MARGIN = 50;
        this.score = 0;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        //this.load.image('background', 'assets/Backgrounds/background.png');
        this.load.image('background', 'assets/Backgrounds/background.png');
        this.load.image('coche', 'assets/PNG/coche.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.crearBackground();
        this.crearCoche();
        this.createTexts();
        this.physics.enable(this.coche, Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
        //this.background.anchor.setTo(0.5, 0.5);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.cocheMover();
    };
    mainState.prototype.crearVehiculos = function () {
    };
    ;
    mainState.prototype.crearBackground = function () {
        this.background = this.add.image(this.world.centerX, this.world.centerY, 'background');
        this.background.anchor.setTo(0.5, 0.5);
    };
    mainState.prototype.cocheTocaCoche = function (coche, vehiculo) {
        vehiculo.kill();
        coche.damage(1);
        this.livesText.setText("Lives: " + this.coche.health);
        this.blink(coche);
        if (coche.health == 0) {
            this.stateText.text = " GAME OVER \n Click to restart";
            this.stateText.visible = true;
            this.input.onTap.addOnce(this.restart, this);
        }
    };
    mainState.prototype.blink = function (sprite) {
        var tween = this.add.tween(sprite)
            .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
            .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out);
        tween.repeat(3);
        tween.start();
    };
    mainState.prototype.restart = function () {
        this.game.state.restart();
    };
    mainState.prototype.createTexts = function () {
        var width = this.scale.bounds.width;
        var height = this.scale.bounds.height;
        this.scoreText = this.add.text(this.TEXT_MARGIN, this.TEXT_MARGIN, 'Puntuacion: ' + this.score, { font: "30px Arial", fill: "#ffffff" });
        this.scoreText.fixedToCamera = true;
        this.livesText = this.add.text(width - this.TEXT_MARGIN, this.TEXT_MARGIN, 'Vidas: ' + this.coche.health, { font: "30px Arial", fill: "#ffffff" });
        this.livesText.anchor.setTo(1, 0);
        this.livesText.fixedToCamera = true;
        this.stateText = this.add.text(width / 2, height / 2, '', { font: '84px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
        this.stateText.fixedToCamera = true;
    };
    ;
    mainState.prototype.crearCoche = function () {
        this.coche = this.add.sprite(this.world.centerX, this.world.centerY, 'coche');
        this.coche.anchor.setTo(0.5, 0.5);
        this.coche.health = this.LIVES;
        this.physics.enable(this.coche, Phaser.Physics.ARCADE);
        this.coche.body.collideWorldBounds = true;
        this.coche.checkWorldBounds = true;
    };
    mainState.prototype.cocheMover = function () {
        if (this.cursors.left.isDown) {
            this.coche.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursors.right.isDown) {
            this.coche.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursors.up.isDown) {
            this.coche.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursors.down.isDown) {
            this.coche.body.acceleration.y = this.ACCELERATION;
        }
        else {
            this.coche.body.acceleration.x = 0;
            this.coche.body.acceleration.y = 0;
        }
    };
    ;
    return mainState;
})(Phaser.State);
var ShooterGame = (function () {
    function ShooterGame() {
        this.game = new Phaser.Game(600, 450, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return ShooterGame;
})();
window.onload = function () {
    var game = new ShooterGame();
};
//# sourceMappingURL=main.js.map