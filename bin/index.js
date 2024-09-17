#!/usr/bin/env node

const { createViewModel } = require('../lib/new-view-model');
const { generateCleanArchitectureTemplate } = require('../lib/generate-clean-architecture-template');
const path = require('path');
const inquirer = require('inquirer');

async function showOptions() {
    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: ['New view-model', 'Generate clean architecture template']
    }]);

    const option = answers.option;

    const folderPath = process.cwd(); // Toma la carpeta actual como destino

    if (option === 'New view-model') {
        createViewModel(folderPath);
    } else if (option === 'Generate clean architecture template') {
        generateCleanArchitectureTemplate(folderPath);
    }
}

showOptions();