import Phaser from "phaser"

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    init() {

    }
    create() {

        this.background = this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'game').setOrigin(0, 0);
        this.style = { font: '30px Arial', fill: '#fff' };
        this.tiempo = this.add.text(0, 0, 'Tiempo', this.style).setOrigin(0, 0);
        this.score = 0;
        this.puntaje = this.add.text(this.game.config.width, 0, 'Puntaje ' + this.score, this.style).setOrigin(1, 0);
        this.restartClick = 0;
        this.colors = ['amarillo', 'verde', 'rojo'];
        this.createPlayer();
        this.createEnemies();
        this.physics.add.collider(this.player, this.enemies, this.enemyCollition, null, this);
    }
    createPlayer() {
        this.cursor = this.input.keyboard.createCursorKeys();
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player = this.physics.add.sprite(100, 100, 'player').setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.player.lives = 3;
        this.player.colorId = 4;
        this.racha = 0;
        this.multiplicadorDoble = false;
        this.player.setImmovable(true);
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
        this.timerEnemies = this.time.addEvent({
            delay: 2000,
            callback: this.createEnemy,
            callbackScope: this,
            loop: true
        });
    }
    createEnemy() {
        const colorId = Phaser.Math.Between(0, this.colors.length);
        let enemy = this.physics.add.sprite(0, 0, this.colors[colorId]).setOrigin(0.5);
        enemy.colorId = colorId;
        enemy.setPosition(this.game.config.width, Phaser.Math.Between(0 + enemy.height, this.game.config.height - enemy.height));
        this.enemies.add(enemy);
        enemy.setVelocityX(-100);
    }
    enemyCollition(player, enemy) {
        enemy.disableBody(true, true);
        if (this.player.colorId == enemy.colorId) {
            this.racha++;
            this.score += 10;
            console.log(this.racha);
            if (this.racha == 3) {
                this.multiplicadorDoble = true;
            }
            if (this.racha == 5) {
                if (this.multiplicadorDoble) {
                    this.score *= 4;
                    this.multiplicadorDoble = false;
                } else {
                    this.score *= 2;
                }
            }
            this.puntaje.setText('Puntaje ' + this.score);
        } else {
            this.racha = 0;
            this.player.lives--;
            this.tiempo.setText('Vidas ' + this.player.lives);
            if (this.player.lives == 0) {
                this.gameOver();
            }
        }
        enemy.destroy();
    }
    gameOver() {
        this.timerEnemies.remove();
        this.player.disableBody(true, true);
        this.enemies.getChildren().forEach(enemy => {
            enemy.disableBody(true, true);
        });

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 20, 'YA ME FUI LA BIKA G_G', this.style).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 20, 'Puntaje obtenido: ' + this.score, this.style).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.scene.start('MenuScene');
        }, this);
    }
    clickRestart() {
        if (this.restartClick == 2) {
        }
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
        this.enemies.getChildren().forEach(enemy => {
            if (enemy.x + enemy.width/2 < 0) {
                enemy.destroy();
            }
        });
    }


}
export default GameScene