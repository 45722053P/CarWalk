/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point = Phaser.Point;
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.ACCELERATION = 500;
        this.LIVES = 3;
        this.TEXT_MARGIN = 50;
        this.contador = 0;
        this.score = 0;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        //this.load.image('carretera', 'assets/Backgrounds/carretera.png');
        this.load.image('ladoderecho', 'assets/Backgrounds/background2.png');
        this.load.image('ladoizquierdo', 'assets/Backgrounds/background1.png');
        this.load.image('carretera', 'assets/Backgrounds/carretera.png');
        this.load.image('coche', 'assets/PNG/coche.png');
        this.load.image('camion', 'assets/PNG/camion.png');
        this.load.image('coche1', 'assets/PNG/coches_normales1.png');
        this.load.image('coche2', 'assets/PNG/coches_normales2.jpg');
        this.load.image('coche3', 'assets/PNG/coches_normales3.jpg');
        this.load.image('pickup1', 'assets/PNG/coches_pikups1.png');
        this.load.image('pickup2', 'assets/PNG/coches_pikups2.png');
        this.load.image('pickup3', 'assets/PNG/coches_pikups-3.png');
        this.load.image('pickup4', 'assets/PNG/coches_pikups-4.png');
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.crearBackground();
        this.vehiculoConfig();
        this.crearCoche();
        this.createTexts();
        this.game.time.events.loop(Phaser.Timer.SECOND, this.actualizarContador, this);
        this.physics.enable(this.coche, Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.crearVehiculos();
        //this.carretera = this.add.sprite(this.world.centerX, this.world.centerY, 'carretera');
        //this.carretera.anchor.setTo(0.5, 0.5);
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.cocheMover();
        this.colisiones();
        if (this.contador == 3) {
            this.crearVehiculos();
            this.contador = 0;
        }
        this.moverCoches();
        this.carretera.tilePosition.y += 4;
        this.ladoD.tilePosition.y += 3;
        this.ladoI.tilePosition.y += 3;
    };
    mainState.prototype.vehiculoConfig = function () {
        this.vehiculos = this.add.group();
        this.vehiculos.enableBody = true;
    };
    mainState.prototype.colisiones = function () {
        this.physics.arcade.collide(this.coche, this.vehiculos, this.cocheTocaCoche, null, this);
        if (this.physics.arcade.overlap(this.coche, this.carretera, this.irCarretera, null, this)) {
            this.score += 5;
            this.scoreText.setText("Puntuacion: " + this.score);
        }
        else if (!this.physics.arcade.overlap(this.coche, this.carretera, this.irCarretera, null, this)) {
            this.score -= 5;
            this.scoreText.setText("Puntuacion: " + this.score);
        }
        //this.physics.arcade.overlap(this.coche,this.ladoD,this.fueraCarreteraD,null,this);
        //this.physics.arcade.overlap(this.coche,this.ladoI,this.fueraCarreteraI,null,this);
    };
    /* private fueraCarreteraI(coche:Phaser.Sprite,ladoI:Phaser.TileSprite){
 
         if(coche.x>this.world.centerX+105){
 
             this.score -= 1;
             this.scoreText.setText("Puntuacion: " + this.score);
 
         }
 
     }
 
     private fueraCarreteraD(coche:Phaser.Sprite, ladoD:Phaser.TileSprite) {
 
         if(coche.x>this.world.centerX-105){
 
             this.score -= 1;
             this.scoreText.setText("Puntuacion: " + this.score);
 
         }
 
     }*/
    mainState.prototype.irCarretera = function (coche, carretera) {
        this.score += 5;
        this.scoreText.setText("Puntuacion: " + this.score);
    };
    mainState.prototype.crearVehiculos = function () {
        var coches = [
            'coche1',
            'coche2',
            'coche3',
            'pickup1',
            'pickup2',
            'pickup3',
            'pickup4'
        ];
        var posiCoche = [
            new Point(this.world.centerX - 50, -100),
            new Point(this.world.centerX + 50, -100),
        ];
        var pos = this.rnd.pick(posiCoche);
        var x = pos.x;
        var y = pos.y;
        var random = this.rnd.pick(coches);
        var cocheBajan = new vehiculo(this.game, x, y, random, null);
        this.add.existing(cocheBajan);
        this.vehiculos.add(cocheBajan);
    };
    ;
    mainState.prototype.moverCoches = function () {
        this.vehiculos.setAll("body.velocity.y", Math.floor((Math.random() * 150) + 50));
    };
    mainState.prototype.crearBackground = function () {
        /*this.carretera = this.add.image(this.world.centerX, this.world.centerY, 'carretera');
         this.carretera.anchor.setTo(0.5, 0.5);*/
        this.ladoI = this.game.add.tileSprite(0, 0, 198, 449, 'ladoizquierdo');
        this.carretera = this.game.add.tileSprite(198, 0, 210, 450, 'carretera');
        this.ladoD = this.game.add.tileSprite(405, 0, 192, 450, 'ladoderecho');
        this.game.physics.enable(this.carretera, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.ladoD, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.ladoI, Phaser.Physics.ARCADE);
        this.carretera.body.allowGravity = false;
        this.carretera.body.immovable = true;
        this.ladoD.body.allowGravity = false;
        this.ladoD.body.immovable = true;
        this.ladoI.body.allowGravity = false;
        this.ladoI.body.immovable = true;
    };
    mainState.prototype.cocheTocaCoche = function (coche, vehiculo) {
        vehiculo.kill();
        this.LIVES = this.LIVES - 1;
        this.livesText.setText("Lives: " + this.LIVES);
        this.blink(coche);
        if (this.LIVES == 0) {
            coche.kill();
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
        this.score = 0;
        this.LIVES = 3;
        this.game.state.restart();
    };
    mainState.prototype.createTexts = function () {
        var width = this.scale.bounds.width;
        var height = this.scale.bounds.height;
        this.scoreText = this.add.text(this.TEXT_MARGIN, this.TEXT_MARGIN, 'Puntuacion: ' + this.score, { font: "30px Arial", fill: "#ffffff" });
        this.scoreText.fixedToCamera = true;
        this.livesText = this.add.text(width - this.TEXT_MARGIN, this.TEXT_MARGIN, 'Vidas: ' + this.LIVES, { font: "30px Arial", fill: "#ffffff" });
        this.livesText.anchor.setTo(1, 0);
        this.livesText.fixedToCamera = true;
        this.stateText = this.add.text(width / 2, height / 2, '', { font: '84px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
        this.stateText.fixedToCamera = true;
    };
    ;
    mainState.prototype.crearCoche = function () {
        this.coche = this.add.sprite(this.world.centerX + 50, 500, 'coche');
        this.coche.anchor.setTo(0.5, 0.5);
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
    mainState.prototype.actualizarContador = function () {
        this.contador++;
    };
    return mainState;
})(Phaser.State);
var vehiculo = (function (_super) {
    __extends(vehiculo, _super);
    function vehiculo(game, x, y, key, frame) {
        _super.call(this, game, x, y, key, frame);
        // Activamos las fisicas
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.immovable = true;
        this.body.allowGravity = false;
    }
    return vehiculo;
})(Phaser.Sprite);
var CarWalk = (function () {
    function CarWalk() {
        this.game = new Phaser.Game(598, 450, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return CarWalk;
})();
window.onload = function () {
    var game = new CarWalk();
};
//# sourceMappingURL=main.js.map