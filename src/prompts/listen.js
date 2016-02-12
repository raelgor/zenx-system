/* global connect_to_mongo */
/* global prompts */
/* global log */
/* global inquirer */
'use strict';

function listen() {
    
    
    if(global.___listening) return;
    
    global.___listening = true;
    
    return global.___listening_prompt = inquirer.prompt([
        {
            name: 'cmd',
            message: '>> ',
            validate: input => { 
                let command = input.match(/^([^ ]*)/)[1];
                return command in global.cli ? true : `Unknown command: '${command}'`;
            }
        }
    ], input => {
        
        let target = input.cmd.match(/^([^ ]*)/)[1];
        
        global.___listening = false;
        
        target &&
        target in global.cli 
        ?
        global.cli[target].handler(input.cmd).then(listen) 
        :
        listen();
        
    });
    
}

module.exports = listen;