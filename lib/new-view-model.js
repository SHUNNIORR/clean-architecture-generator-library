const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer'); // Usamos inquirer para obtener input del usuario

async function createViewModel(folderPath) {
    const { fileName } = await inquirer.prompt([{
        type: 'input',
        name: 'fileName',
        message: 'Enter the name for the view model file:',
        validate: function (input) {
            if (input.trim() === '') {
                return 'File name cannot be empty';
            }
            return true;
        }
    }]);

    const fileExtension = 'view-model';
    const fullFileName = `${fileName}.${fileExtension}.ts`;
    const fullPath = path.join(folderPath, fullFileName);
    const testFullFileName = `${fileName}.${fileExtension}.spec.ts`;
    const testFullPath = path.join(folderPath, testFullFileName);
    const className = toCamelCase(fileName) + 'ViewModel';
    const content = generateViewModelContent(fileName, className, fileExtension);

    // Crear los archivos en la carpeta especificada
    fs.writeFileSync(fullPath, content.viewModelContent);
    fs.writeFileSync(testFullPath, content.testViewModelContent);

    console.log(`Archivo ${fullFileName} y su archivo de prueba ${testFullFileName} generado exitosamente en ${folderPath}`);
}

function toCamelCase(input) {
    return input
        .toLowerCase()
        .split(/[-.]/)  // Divide el nombre en palabras usando - y . como separadores
        .map((word, index) => index === 0 ? word : capitalizeFirstLetter(word))
        .join('');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateViewModelContent(fileName, className, fileExtension) {
    const camelCaseFileName = toCamelCase(fileName);
    const definitiveClassName = capitalizeFirstLetter(className);
    const viewModelContent = `
import { Injectable } from '@angular/core';

@Injectable()
export class ${definitiveClassName} {
  // Propiedades del ViewModel
  constructor() {
    // Inicialización de propiedades
  }
}
`;

    const testViewModelContent = `
import { TestBed } from '@angular/core/testing';

import { ${definitiveClassName} } from './${fileName}.${fileExtension}';

describe('${camelCaseFileName}ViewModel', () => {
    let viewModel: ${definitiveClassName};

    beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
       ${definitiveClassName},
      ],
    });
    viewModel = TestBed.inject(${definitiveClassName});
  });

  it('should be created', () => {
    expect(viewModel).toBeTruthy();
  });
})
`;

    return {
        viewModelContent,
        testViewModelContent
    };
}

module.exports = {
    createViewModel
};
