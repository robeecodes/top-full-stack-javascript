// scripts/generate-licenses.js
import {init} from 'license-checker';
import {writeFileSync} from 'fs';

init({
    start: './node_modules',
}, (err, licenses) => {
    if (err) {
        console.error(err);
        return;
    }
    const licenseText = Object.entries(licenses)
        .map(([module, info]) => `${module}: ${info.license}`)
        .join('\n');

    writeFileSync('./LICENSES.txt', licenseText);
});
