/* global path */
/* global fs */
/* global log */
/* global inquirer */
'use strict';

function update_creds() {
    
    var config = (global.config && global.config.core_credentials) || {};
    
    return new Promise(resolve => {
        
        inquirer.prompt([
            { name: 'name', default: config.name, message: 'Database name: '},
            { name: 'host', default: config.host, message: 'Host: ' },
            { name: 'port', default: config.port, message: 'Port: ' },
            { name: 'user', default: config.user, message: 'User: ' },
            { name: 'password', default: config.password, message: 'Password: ', type: 'password' },
            { name: 'query_string', default: config.query_string, message: 'Query string: ' }
        ], answers => {
            
            if(answers.query_string)
                answers.query_string = answers.query_string.replace(/(^[^?])/, '?$1');
            
            global.config = config = { core_credentials: answers };
            
            log('Saving new credentials...');
            fs.writeFileSync(path.resolve(__dirname, './../../config.json'), JSON.stringify(config));
            
            log.green('New credentials saved.');
            resolve(true);
            
        });
        
    });
    
}

module.exports = update_creds;