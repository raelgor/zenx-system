/* global inquirer */
'use strict';

function conf_update_creds() {
    
    return new Promise(resolve => {
        
        inquirer.prompt([
            {
                name: 'mkconfig',
                message: 'Do you want to set database credentials now? (y/n)',
                validate: val => { return /^[yn]$/.test(val) ? true : `Please type 'y' or 'n'` }
            }
        ], answers => resolve(answers.mkconfig === 'y'));
        
    });
    
}

module.exports = conf_update_creds;