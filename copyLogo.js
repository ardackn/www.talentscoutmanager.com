const fs = require('fs');
const source = 'C:\\Users\\lenovo\\.gemini\\antigravity\\brain\\3fbc1701-e3fd-4bfb-9dce-585aa25e491e\\media__1777168273025.png';
const destination = 'C:\\Users\\lenovo\\www.talentscoutmanager.com\\public\\data\\logo.png';

try {
    fs.copyFileSync(source, destination);
    console.log('Logo copied successfully to ' + destination);
} catch (err) {
    console.error('Error copying logo:', err);
}
