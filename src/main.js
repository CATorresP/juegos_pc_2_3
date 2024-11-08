import PreloadScene from "./states/PreloadScene";
import MenuScene from "./states/MenuScene";
import GameScene from "./states/GameScene";

let config = {
    /*width: window.innerWidth 100%,
    height: window.innerHeight,*/
    width: 640 ,
    height: 380,
    scene: [PreloadScene,MenuScene, GameScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default : 'arcade',
        arcade:{
            //debug:true,
            gravity:{
                y : 200
            }
        }
    }
};
new Phaser.Game(config);