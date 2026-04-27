const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\3fbc1701-e3fd-4bfb-9dce-585aa25e491e';
const destDir = 'C:\\Users\\lenovo\\www.talentscoutmanager.com\\public\\data';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  { src: 'turkish_player_1_1777145034014.png', dest: 'player1.png' },
  { src: 'turkish_player_2_1777145141550.png', dest: 'player2.png' },
  { src: 'turkish_player_3_1777145211171.png', dest: 'player3.png' },
  { src: 'google_maps_nurol_kulesi_1777147814432.png', dest: 'map_nurol.png' }
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.log(`Source file not found: ${sourcePath}`);
  }
});
