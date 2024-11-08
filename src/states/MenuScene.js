import Phaser from "phaser"

class MenuScene extends Phaser.Scene{
    constructor(){
        super("MenuScene");
    }
    preload(){
    }
    create(){
        this.background = this.add.image(0,0,'menu').setOrigin(0,0);
        let style = { font: '30px Arial', fill: '#fff' };
        this.add.text( this.game.config.width / 2, this.game.config.height / 2 - 30,'Bica 4 life G_G and forever', style).setOrigin(0.5);
        this.add.text( this.game.config.width / 2, this.game.config.height / 2 + 30,'César Augusto Torres Paniagua', style).setOrigin(0.5);

        this.input.keyboard.on('keydown',()=>{
            this.scene.start('GameScene');
        });
        this.input.on('pointerdown',()=>{
            this.scene.start('GameScene');
        });
    }
}
export default MenuScene