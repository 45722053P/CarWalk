/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {

    preload():void {
        super.preload();

        //this.load.image('background', 'assets/Backgrounds/background.png');

        this.load.image('background', 'assets/Backgrounds/background.png');
        this.load.image('coche', 'assets/PNG/coche.png');


        this.physics.startSystem(Phaser.Physics.ARCADE);

    }

    create():void {

        super.create();

        this.crearBackground();
        this.crearCoche();
        this.createTexts();


        this.physics.enable(this.coche, Phaser.Physics.ARCADE);
        this.cursors = this.input.keyboard.createCursorKeys();

        //this.background = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
        //this.background.anchor.setTo(0.5, 0.5);


    }

    update():void {
        super.update();
        this.cocheMover();

    }

    private crearVehiculos() {



    };

    private crearBackground(){

        this.background = this.add.image(this.world.centerX, this.world.centerY, 'background');
        this.background.anchor.setTo(0.5, 0.5);

    }

    private cocheTocaCoche(coche:Phaser.Sprite, vehiculo:Phaser.Sprite) {
        vehiculo.kill();

        coche.damage(1);

        this.livesText.setText("Lives: " + this.coche.health);

        this.blink(coche);

        if (coche.health == 0) {
            this.stateText.text = " GAME OVER \n Click to restart";
            this.stateText.visible = true;

            this.input.onTap.addOnce(this.restart, this);
        }

    }

    blink(sprite:Phaser.Sprite) {
        var tween = this.add.tween(sprite)
            .to({alpha: 0.5}, 100, Phaser.Easing.Bounce.Out)
            .to({alpha: 1.0}, 100, Phaser.Easing.Bounce.Out);

        tween.repeat(3);
        tween.start();
    }

    restart() {
        this.game.state.restart();
    }

    private createTexts() {

        var width = this.scale.bounds.width;
        var height = this.scale.bounds.height;

        this.scoreText = this.add.text(this.TEXT_MARGIN, this.TEXT_MARGIN, 'Puntuacion: ' + this.score,
            {font: "30px Arial", fill: "#ffffff"});
        this.scoreText.fixedToCamera = true;
        this.livesText = this.add.text(width - this.TEXT_MARGIN, this.TEXT_MARGIN, 'Vidas: ' + this.coche.health,
            {font: "30px Arial", fill: "#ffffff"});
        this.livesText.anchor.setTo(1, 0);
        this.livesText.fixedToCamera = true;

        this.stateText = this.add.text(width / 2, height / 2, '', {font: '84px Arial', fill: '#fff'});
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
        this.stateText.fixedToCamera = true;

    };

    private crearCoche(){

        this.coche = this.add.sprite(this.world.centerX, this.world.centerY, 'coche');
        this.coche.anchor.setTo(0.5, 0.5);

        this.coche.health = this.LIVES;
        this.physics.enable(this.coche, Phaser.Physics.ARCADE);
        this.coche.body.collideWorldBounds = true;
        this.coche.checkWorldBounds = true;
    }

    private fueraCarretera() {

        if(this.coche.body.x>this.world.x(50)||this.coche.body.x<this.world.x(-50)){

            this.score -= 10;
            this.scoreText.setText("Puntuacion: " + this.score);

        }

    }
    private cocheMover() {
        if (this.cursors.left.isDown) {

            this.coche.body.acceleration.x = -this.ACCELERATION;

        } else if (this.cursors.right.isDown) {

            this.coche.body.acceleration.x = this.ACCELERATION;

        } else if (this.cursors.up.isDown) {

            this.coche.body.acceleration.y = -this.ACCELERATION;

        } else if (this.cursors.down.isDown) {

            this.coche.body.acceleration.y = this.ACCELERATION;

        } else {

            this.coche.body.acceleration.x = 0;
            this.coche.body.acceleration.y = 0;

        }
    };
}

class CarWalk {

    private coche:Phaser.Sprite;

    private background:Phaser.Image;
    private cursors:Phaser.CursorKeys;
    private vehiculos:Phaser.Group;

    private scoreText:Phaser.Text;
    private livesText:Phaser.Text;
    private stateText:Phaser.Text;

    private ACCELERATION:number = 100;
    private COCHE_MAX_VELOCITY = 400;
    private LIVES = 3;
    private TEXT_MARGIN = 50;

    private score = 0;

    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 450, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new CarWalk();
};
