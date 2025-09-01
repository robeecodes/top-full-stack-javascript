import { init } from 'license-checker';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';

// Read package.json to get the list of direct dependencies
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
const directDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
};

// Extract package names without versioning
const directDependencyNames = Object.keys(directDependencies);

init({
    start: './',
}, (err, licenses) => {
    if (err) {
        console.error(err);
        return;
    }

    const licenseText = Object.entries(licenses)
        .filter(([module]) => {
            // Check if the module name matches any of the direct dependencies
            return directDependencyNames.some(dep => module.startsWith(dep));
        })
        .map(([module, info]) => `== ${module}: == \nLicenses: ${info.licenses}\nRepository: ${info.repository ?? "Not Provided"}\nPublisher: ${info.publisher ?? "Not Provided"}\nURL: ${info.url ?? "Not Provided"}\n`)
        .join('\n');

    writeFileSync('./LICENSES.txt', licenseText);
});
