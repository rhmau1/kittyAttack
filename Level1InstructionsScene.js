// class Level1InstructionsScene extends Phaser.Scene {
//   constructor() {
//     super('level1Instructions');
//   }

//   create() {
//     const centerX = this.sys.game.config.width / 2;

//     // Tampilkan teks instruksi
//     const instructionsText = this.add.text(
//       centerX,
//       200,
//       'Kamu adalah kitty yang sedang berjalan-jalan di hutan.\n' +
//         'Namun di dalam hutan kamu bertemu dengan monster.\n' +
//         'Untuk selamat kamu harus membunuh monster-monster tersebut.\n\n' +
//         'Kontrol:\n' +
//         'A/D atau Left/Right untuk bergerak\n' +
//         'W atau Up untuk melompat\n' +
//         'Spasi untuk serangan\n\n' +
//         'Misi:\n' +
//         'Pada level 1 ini kamu mempunyai misi untuk membunuh dua monster.\n' +
//         'Jika kamu berhasil maka kamu bisa lanjut ke level 2\n\n' +
//         '[Tekan Enter untuk memulai]',
//       {
//         fontSize: '24px',
//         fill: 'white',
//         align: 'center',
//       }
//     );
//     instructionsText.setOrigin(0.5);

//     this.input.keyboard.once('keydown-ENTER', () => {
//       this.scene.start('level1'); // Berpindah ke mode permainan level 1 setelah menekan Enter
//     });
//   }
// }
