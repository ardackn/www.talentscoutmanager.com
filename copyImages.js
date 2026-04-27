const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\3fbc1701-e3fd-4bfb-9dce-585aa25e491e';
const destDir = 'C:\\Users\\lenovo\\www.talentscoutmanager.com\\public\\data';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesToCopy = [
  { src: 'tsm_about_1777168444975.png', dest: 'tsm_about.png' },
  { src: 'tsm_scout_1777168487501.png', dest: 'tsm_scout.png' },
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
