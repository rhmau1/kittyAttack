window.onload = function () {
  var config = {
    width: 1290,
    height: 600,
    scene: [menuGame, Scene1, Scene2, Scene3, Scene4],
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
  };
  var game = new Phaser.Game(config);
};
