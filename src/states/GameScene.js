import Phaser from "phaser"

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    init() {
        
    }
    create() {
        this.background = this.add.image(0, 0, 'game').setOrigin(0, 0);
        let style = { font: '30px Arial', fill: '#fff' };
        this.tiempo = this.add.text(0, 0, 'Tiempo', style).setOrigin(0,0);
        this.puntaje = this.add.text(this.game.config.width, 0, 'Puntaje 0', style).setOrigin(1,0);
    }
}
export default GameScene