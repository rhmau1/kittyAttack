window.onload = function () {
  var config = {
    width: 1290,
    height: 600,
    scene: [menuGame, Level1InstructionsScene, Scene1, Scene2],
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
