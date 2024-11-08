import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('gameover', 'assets/fondos/gam-over.jpg');
        this.load.image('game', 'assets/fondos/game.png');
        this.load.image('menu', 'assets/fondos/menu.png');
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 66,
            frameHeight: 92
        });
        this.load.spritesheet('amarillo', 'assets/amarillo.png', {
            frameWidth: 66,
            frameHeight: 82
        });
        this.load.spritesheet('rojo', 'assets/rojo.png', {
            frameWidth: 66,
            frameHeight: 92
        });
        this.load.spritesheet('verde', 'assets/verde.png', {
            frameWidth: 66,
            frameHeight: 92
        });
    }
    create(){
        this.scene.start('MenuScene');
    }
}
export default PreloadScene