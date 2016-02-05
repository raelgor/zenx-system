/* global load_scripts */
/* global load_core_creds */
/* global load_configuration */
/* global prompts */
'use strict';

module.exports = {
    
    commands: {
        core_creds: {
            handler: command => {
                return load_core_creds();
            }
        },
        config: {
            handler: command => {
                return load_configuration();
            }
        },
        scripts: {
            handler: command => {
                return load_scripts();
            }
        }
    },
    handler: function(command) {
        var target = this.commands[command.split(/[ ]+/)[1]];
        return target && target.handler(command);
    }
    
}