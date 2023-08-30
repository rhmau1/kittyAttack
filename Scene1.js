class Scene1 extends Phaser.Scene {
  constructor() {
    super('level1');
    this.monsterCount = 0; // Jumlah monster yang sudah dibunuh
    this.isGameEnded = false; // Apakah permainan sudah berakhir
    this.score = 0;
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
    this.load.image('kittyTabrak', 'assets/images/kittyTabrak.png');
    this.load.audio('bgsound', 'assets/sound/bgSound.mp3');
    this.load.audio('gameover', 'assets/sound/gameOver.mp3');
    this.load.audio('win', 'assets/sound/win.mp3');
  }
  create() {
    this.isGameEnded = false;
    this.monsterCount = 0;
    this.score = 0;
    this.background = this.add.image(0, 0, 'background').setDisplaySize(1290, 600);
    this.background.setOrigin(0, 0);

    this.bgsound = this.sound.add('bgsound', { loop: true });
    this.bgsound.play();

    this.kitty = this.add.image(50, 500, 'kitty').setDisplaySize(100, 100);

    this.physics.world.enable(this.kitty); // Hanya aktifkan fisika untuk kitty

    this.input.keyboard.on('keydown-ENTER', this.kittyAttack, this);
    this.kitty.attack = false;
    this.input.keyboard.on('keydown-W', this.kittyJump, this);
    this.input.keyboard.on('keydown-UP', this.kittyJump, this);

    this.balls = this.add.group(); // Ubah ini dari this.physics.add.group() menjadi this.add.group()

    // Buat grup untuk monster
    this.monsters = this.add.group();
    this.spawnMonster(); // Pertama kali munculkan monster

    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      fill: 'white',
      fontSize: '20px',
    });
    this.killText = this.add.text(20, this.scoreText.y + this.scoreText.height + 10, 'Monsters Killed: 0 / 5', {
      fill: 'white',
      fontSize: '20px',
    });
    this.level = this.add.text(20, this.killText.y + this.killText.height + 10, 'Level 1', {
      fill: 'white',
      fontSize: '20px',
    });

    this.nextButton = this.add.text(500, 300, 'Next', {
      fill: 'white',
      fontSize: '20px',
    });
    this.playAgainButton = this.add.text(500, 350, 'Play Again', {
      fill: 'white',
      fontSize: '20px',
    });
    this.exitButton = this.add.text(500, 400, 'Exit', {
      fill: 'white',
      fontSize: '20px',
    });

    // Menambahkan aksi klik pada tombol-tombol
    this.nextButton.setInteractive().on('pointerdown', () => {
      // Tambahkan logika untuk lanjut ke level berikutnya
      this.scene.start('level2');
    });
    this.playAgainButton.setInteractive().on('pointerdown', () => {
      this.scene.restart(); // Memulai ulang permainan
      this.isGameEnded = false;
      this.monsterCount = 0;
    });
    this.exitButton.setInteractive().on('pointerdown', () => {
      this.scene.stop(); // Menghentikan scene
      this.scene.start('bootGame');
    });

    // Menyembunyikan tombol-tombol
    this.nextButton.visible = false;
    this.playAgainButton.visible = false;
    this.exitButton.visible = false;

    this.buttons = [this.nextButton, this.playAgainButton, this.exitButton];

    // Menampilkan teks jika memenangkan level
    this.winText = this.add.text(500, 200, '', {
      fill: 'white',
      fontSize: '32px',
    });
  }

  update() {
    if (!this.isGameEnded) {
      this.physics.overlap(this.balls, this.monsters, this.hitMonster, null, this);
      this.physics.overlap(this.kitty, this.monsters, this.checkTabrakan, null, this);
      this.moveMonsters(-1);
    }

    if (!this.isGameEnded) {
      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown) {
        if (this.kitty.x < this.sys.game.config.width - 50) {
          this.kitty.body.velocity.x = 300; // Move right
          this.turnKittyRight();
        } else {
          this.kitty.body.velocity.x = 0; // Stop moving at the right boundary
        }
      } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown) {
        if (this.kitty.x > 50) {
          this.kitty.body.velocity.x = -300; // Move left
          this.turnKittyLeft();
        } else {
          this.kitty.body.velocity.x = 0; // Stop moving at the left boundary
        }
      } else {
        this.kitty.body.velocity.x = 0; // Stop moving when no keys are pressed
      }
    }

    if (this.kitty.attack) {
      const ballVelocity = this.kitty.facingLeft ? -300 : 300;
      this.balls.children.iterate((ball) => {
        ball.body.velocity.x = ballVelocity; // Arah bola berdasarkan arah hadapan kitty saat attack
      });
    }
  }

  turnKittyLeft() {
    if (!this.isGameEnded) {
      this.kitty.flipX = true;
      this.kitty.facingLeft = true;
    }
  }

  turnKittyRight() {
    if (!this.isGameEnded) {
      this.kitty.flipX = false;
      this.kitty.facingLeft = false;
    }
  }

  kittyJump() {
    if (!this.isGameEnded && !this.kitty.jumping) {
      this.kitty.jumping = true;

      this.tweens.add({
        targets: this.kitty,
        y: this.kitty.y - 150,
        duration: 300,
        ease: 'Power1',
        yoyo: true,
        onComplete: () => {
          this.kitty.jumping = false;
        },
      });
    }
  }

  kittyAttack() {
    if (!this.isGameEnded && !this.kitty.attack) {
      this.kitty.attack = true;

      // Buat bola-bola kecil dari posisi kitty
      const ball = this.add.circle(this.kitty.x + 50, this.kitty.y, 10, 0xff0000);
      this.physics.world.enable(ball);
      ball.body.velocity.x = 300; // Kecepatan bola-bola

      // Tambahkan bola-bola kecil ke grup
      this.balls.add(ball);

      // Set waktu timeout untuk mengatur ulang serangan kitty
      this.time.delayedCall(1000, () => {
        this.kitty.attack = false;
      });
    }
  }

  spawnMonster() {
    if (!this.isGameEnded) {
      const randomX = Phaser.Math.Between(800, this.sys.game.config.width - 100); // Menghasilkan angka acak antara 800 dan lebar layar - 100

      const monster = this.add.sprite(randomX, 500, 'monster').setDisplaySize(100, 100);
      this.physics.world.enable(monster);

      if (!this.anims.get('monster_walk')) {
        this.anims.create({
          key: 'monster_walk',
          frames: this.anims.generateFrameNumbers('monster', {
            start: 0,
            end: 10,
          }),
          frameRate: 10,
          repeat: -1,
        });
      }

      monster.play('monster_walk');

      // Tambahkan monster ke grup monsters
      this.monsters.add(monster);

      // Set waktu timeout untuk memanggil kembali fungsi spawnMonster
      this.time.delayedCall(2000, this.spawnMonster, [], this);
    }
  }

  moveMonsters(speed) {
    this.monsters.children.iterate((monster) => {
      monster.x += speed;
      if (monster.x < -100) {
        monster.x = 1290;
      }
    });
  }

  hitMonster(ball, monster) {
    ball.destroy();
    this.monsterDead = this.add.sprite(monster.x, monster.y, 'monsterDead').setDisplaySize(100, 100);
    if (!this.anims.get('monster_dead')) {
      this.anims.create({
        key: 'monster_dead',
        frames: this.anims.generateFrameNumbers('monsterDead', {
          start: 0,
          end: 10,
        }),
        frameRate: 10,
        repeat: 0,
      });
    }
    monster.play('monster_walk');
    monster.destroy();
    this.time.delayedCall(500, () => {
      this.monsterDead.destroy();
    });
    this.monsterCount++;
    this.killText.setText('Monsters Killed: ' + this.monsterCount + ' / 5');
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    if (this.monsterCount >= 5 && !this.isGameEnded) {
      this.endGame();
    }
  }

  checkTabrakan(kitty, monster) {
    this.isGameEnded = true;

    this.bgsound.stop();
    this.gameover = this.sound.add('gameover');
    this.gameover.play();

    this.kitty.destroy();

    this.monsters.children.iterate((monster) => {
      monster.anims.stop();
    });

    // Menggelapkan latar belakang
    this.dimBackground = this.add.graphics();
    this.dimBackground.fillStyle(0x000000, 0.7);
    this.dimBackground.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    this.dimBackground.setDepth(1); // Set depth latar belakang agar di bawah elemen-elemen lain

    // Mengganti teks menjadi "Game Over"
    this.winText.setText('Game Over');
    this.winText.setDepth(2);

    // Menambahkan gambar kittyTabrak di posisi tabrakan
    const kittyTabrak = this.add.image(kitty.x, kitty.y, 'kittyTabrak').setDisplaySize(100, 100);

    this.playAgainButton.visible = true;
    this.playAgainButton.setDepth(2);

    this.exitButton.visible = true;
    this.exitButton.setDepth(2);
  }
  endGame() {
    this.isGameEnded = true;

    this.bgsound.stop();
    this.win = this.sound.add('win');
    this.win.play();
    this.monsters.children.iterate((monster) => {
      monster.anims.stop();
    });

    // Menggelapkan latar belakang
    this.dimBackground = this.add.graphics();
    this.dimBackground.fillStyle(0x000000, 0.7);
    this.dimBackground.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    this.dimBackground.setDepth(1); // Set depth latar belakang agar di bawah elemen-elemen lain

    this.winText.setText('You Win Level 1');
    this.winText.setDepth(2);

    this.nextButton.visible = true;
    this.nextButton.setDepth(2);

    this.playAgainButton.visible = true;
    this.playAgainButton.setDepth(2);

    this.exitButton.visible = true;
    this.exitButton.setDepth(2);
  }
}
