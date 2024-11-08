import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('gameover', 'assets/fondos/gam-over.jpg');
        this.load.image('game', 'assets/fondos/game.png');
        this.load.image('menu', 'assets/fondos/menu.png');
    }
    create(){
        this.scene.start('MenuScene');
    }
}
export default PreloadScene