class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('Instructions');
  }

  preload() {
    this.load.image('background', 'assets/images/background.jpeg');
  }
  create() {
    this.add.image(0, 0, 'background').setDisplaySize(1290, 600).setOrigin(0, 0);

    const centerX = this.sys.game.config.width / 2;

    // Menggelapkan latar belakang
    this.dimBackground = this.add.graphics();
    this.dimBackground.fillStyle(0x000000, 0.7);
    this.dimBackground.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    this.dimBackground.setDepth(1);

    // Tampilkan teks instruksi
    const instructionsText = this.add.text(
      centerX,
      200,
      'Kamu adalah kitty yang sedang berjalan-jalan di hutan.\n' +
        'Namun di dalam hutan kamu bertemu dengan banyak rintangan.\n' +
        'Untuk selamat kamu harus menyelesaikan semua misi dalam tiap-tiap level.\n\n' +
        'Kontrol:\n' +
        'A/D atau Left/Right untuk bergerak\n' +
        'W atau Up untuk melompat\n' +
        'ENTER untuk serangan\n\n' +
        'Ingat:\n' +
        'Jangan sampai kitty menabrak meja atau monster agar tidak mati.\n\n' +
        '[Tekan Enter untuk memulai level 1]',
      {
        fontSize: '24px',
        fill: 'white',
        align: 'center',
      }
    );
    instructionsText.setOrigin(0.5);
    instructionsText.setDepth(2);

    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('level1'); // Berpindah ke mode permainan level 1 setelah menekan Enter
    });
  }
}
