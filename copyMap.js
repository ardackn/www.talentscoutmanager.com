const fs = require('fs');
const path = require('path');

const filesToCopy = [
  {
    src: 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\3fbc1701-e3fd-4bfb-9dce-585aa25e491e\\google_maps_nurol_kulesi_1777147814432.png',
    dest: 'C:\\Users\\lenovo\\www.talentscoutmanager.com\\public\\data\\map_nurol.png'
  }
];

filesToCopy.forEach(file => {
  try {
    fs.copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Error copying ${file.src}:`, err);
  }
});
