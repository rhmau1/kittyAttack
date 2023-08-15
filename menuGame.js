class menuGame extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('background', 'assets/images/background.jpeg');
    this.load.image('kitty', 'assets/images/kitty2.png');
    this.load.spritesheet('monster', 'assets/monster/MonsterWalk.png', {
      frameWidth: 45.4,
      frameHeight: 68,
    });
    this.load.spritesheet('monsterDead', 'assets/monster/MonsterDead.png', {
      frameWidth: 45.4,
      frameHeight: 68,
    });
  }

  create() {
    // Tambahkan background
    this.add.image(0, 0, 'background').setDisplaySize(1290, 600).setOrigin(0, 0);

    // Tambahkan kitty
    this.add.image(250, 400, 'kitty').setDisplaySize(200, 200);

    // Tambahkan judul Kitty Attack di tengah agak atas
    const titleText = this.add
      .text(this.sys.game.config.width / 2, 50, 'Kitty Attack', {
        fontSize: '50px',
        fill: 'white',
      })
      .setOrigin(0.5);

    // Tambahkan teks Select a level di tengah layar
    const centerX = this.sys.game.config.width / 2;
    this.add
      .text(centerX, 130, 'Select a level:', {
        fontSize: '32px',
        fill: 'white',
      })
      .setOrigin(0.5);

    // Buat tombol Level 1 dan Level 2
    const level1Button = this.add
      .text(centerX, 190, 'Level 1', {
        fontSize: '24px',
        fill: 'white',
        backgroundColor: '#333',
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5);

    const level2Button = this.add
      .text(centerX, 240, 'Level 2', {
        fontSize: '24px',
        fill: 'white',
        backgroundColor: '#333',
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5);

    const level3Button = this.add
      .text(centerX, 290, 'Level 3', {
        fontSize: '24px',
        fill: 'white',
        backgroundColor: '#333',
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5);

    const level4Button = this.add
      .text(centerX, 340, 'Level 4', {
        fontSize: '24px',
        fill: 'white',
        backgroundColor: '#333',
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5);

    const instruksiButton = this.add
      .text(centerX, 390, 'Instruction', {
        fontSize: '24px',
        fill: 'white',
        backgroundColor: '#333',
        padding: {
          x: 10,
          y: 5,
        },
      })
      .setOrigin(0.5);

    // const bonusButton = this.add
    //   .text(this.sys.game.config.width - 70, this.sys.game.config.height - 70, 'Bonus', {
    //     fontSize: '24px',
    //     fill: 'white',
    //     backgroundColor: '#333',
    //     padding: {
    //       x: 10,
    //       y: 5,
    //     },
    //   })
    //   .setOrigin(1)
    //   .setInteractive();

    // const level5Button = this.add
    //   .text(centerX, 390, 'Level 5', {
    //     fontSize: '24px',
    //     fill: 'white',
    //     backgroundColor: '#333',
    //     padding: {
    //       x: 10,
    //       y: 5,
    //     },
    //   })
    //   .setOrigin(0.5);

    level1Button.setInteractive().on('pointerdown', () => {
      this.scene.start('level1');
    });

    level2Button.setInteractive().on('pointerdown', () => {
      this.scene.start('level2');
    });

    level3Button.setInteractive().on('pointerdown', () => {
      this.scene.start('level3');
    });
    level4Button.setInteractive().on('pointerdown', () => {
      this.scene.start('level4');
    });
    instruksiButton.setInteractive().on('pointerdown', () => {
      this.scene.start('Instructions');
    });
    // level5Button.setInteractive().on('pointerdown', () => {
    //   this.scene.start('level5');
    // });
  }
}
