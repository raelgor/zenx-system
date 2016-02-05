/* global config */
/* global log */
/* global prompts */
'use strict';

module.exports = {
    
    commands: {
        core_creds: {
            handler: command => {
                listObject(config.core_credentials);
                return Promise.resolve();
            }
        },
        config: {
            handler: command => {
                listObject(config);
                return Promise.resolve();
            }
        },
        cli: {
            handler: command => {
                listObject(Object.keys(global.cli));
                return Promise.resolve();
            }
        }
    },
    handler: function(command) {
        var target = this.commands[command.split(/[ ]+/)[1]];
        return target && target.handler(command);
    }
    
}

function listObject(obj) {
    
    if(obj instanceof Array)
        for(let e of obj)
            log.magenta(e);
    else
        for(let key in obj)
            log.magenta(`${ key }: ${ obj[key] }`);
    
}