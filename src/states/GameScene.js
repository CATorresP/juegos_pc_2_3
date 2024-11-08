import Phaser from "phaser"

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    init() {
        
    }
    create() {
        this.background = this.add.image(0, 0, 'game').setOrigin(0, 0);
        this.style = { font: '30px Arial', fill: '#fff' };
        this.tiempo = this.add.text(0, 0, 'Tiempo', this.style).setOrigin(0, 0);
        this.puntaje = this.add.text(this.game.config.width, 0, 'Puntaje 0', this.style).setOrigin(1, 0);
        this.colors = ['amarillo', 'verde', 'rojo'];

        this.createPlayer();

    }
    createPlayer() {
        this.cursor = this.input.keyboard.createCursorKeys();
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player = this.physics.add.sprite(100, 100, 'player').setOrigin(0.5);
        this.player.body.allowGravity = false;
        this.player.lives = 3;
        this.player.colorId = 4;
        this.tiempo = this.add.text(0, this.tiempo.height, 'Vidas 3', this.style).setOrigin(0, 0);
        this.anims.create({
            key: 'player',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
        });
        this.anims.create({
            key: 'amarillo',
            frames: this.anims.generateFrameNumbers('amarillo', { start: 0, end: 0 }),
        });
        this.anims.create({
            key: 'rojo',
            frames: this.anims.generateFrameNumbers('rojo', { start: 0, end: 0 }),
        });
        this.anims.create({
            key: 'verde',
            frames: this.anims.generateFrameNumbers('verde', { start: 0, end: 0 }),
        });
    }
    createEnemies() {
        this.enemies = this.physics.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: this.createEnemy,
            callbackScope: this,
            loop: true
        });
    }
    createEnemy() {
        const colorId = Phaser.Math.Between(0, colors.length);
        let enemy = this.physics.add.sprite(this.game.config.width/2, this.game.config.width/2, this.colors[colorId]).setOrigin(0.5);
        enemy.colorId = colorId;

        enemy.setPosition(this.game.config.width, Phaser.Math.Between(0, this.game.config.width + enemy.width));
        enemy.setVelocityX(-100);
        this.enemies.add(enemy);
    }


    update() {
        if (this.w.isDown) {
            this.player.setVelocityY(-200);
            this.player.anims.play('amarillo', true);
            this.player.colorId = 0;
        } else if (this.s.isDown) {
            this.player.setVelocityY(200);
            this.player.anims.play('rojo', true);
            this.player.colorId = 2;
        } else {
            this.player.setVelocityY(0);
            if (this.a.isDown) {
                this.player.anims.play('player', true);
                this.player.colorId = 4;
            } else if (this.d.isDown) {
                this.player.anims.play('verde', true);
                this.player.colorId = 1;
            }
        }
    }
}
export default GameScene