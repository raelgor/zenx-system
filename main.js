/* global fs */
/* global inquirer */
/* global log */
'use strict';

global.log = require('./src/log');
global.mongodb = require('mongodb');
global.co = require('co');
global.inquirer = require('inquirer');
global.fs = require('fs');

log('Starting...');

try {
    
    global.config = require('./config');
    log('Configuration loaded. Peachy!');
    
} catch (error) {
    
    log.error(`No configuration file provided.`);
    log.error(`Please consult README.md or config.js.example and provide a 'config.js' or 'config.json' file with information about the core system database.`);
    
    inquirer.prompt([
        {
            name: 'mkconfig',
            message: 'Do you want to input mongo credentials now? (y/n)',
            type: 'input',
            validate: val => { return ~['y','n'].indexOf(val) ? true : `Please type 'y' or 'n'` }
        }], answer => {
            if(answer.mkconfig === 'y')
                inquirer.prompt([
                    { name: 'host', message: 'Host: ' },
                    { name: 'port', message: 'Port: ' },
                    { name: 'user', message: 'User: ' },
                    { name: 'password', message: 'Password: ', type: 'password' },
                ], answers => {
                    
                    log('Saving new credentials...');
                    fs.writeFileSync('./config.json', JSON.stringify(answers));
                    
                    log('Trying to connect...');
                    
                })
            else {
                log.warn('Exiting...');
                process.exit();
            }
        });
    
}