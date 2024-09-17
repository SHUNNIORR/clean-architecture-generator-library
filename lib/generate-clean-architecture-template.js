const fs = require('fs');
const path = require('path');

function generateCleanArchitectureTemplate(folderPath) {
    const domainPath = path.join(folderPath, 'domain');
    const applicationPath = path.join(folderPath, 'application');
    const infrastructurePath = path.join(folderPath, 'infrastructure');
    const gatewaysPath = path.join(infrastructurePath, 'gateways');

    fs.mkdirSync(domainPath, { recursive: true });
    fs.mkdirSync(applicationPath, { recursive: true });
    fs.mkdirSync(infrastructurePath, { recursive: true });
    fs.mkdirSync(gatewaysPath, { recursive: true });

    console.log(`Carpetas 'domain', 'application', 'infrastructure' y 'gateways' creadas en ${folderPath}`);
}

module.exports = { generateCleanArchitectureTemplate };
