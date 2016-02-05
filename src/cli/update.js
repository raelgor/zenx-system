/* global prompts */
'use strict';

module.exports = {
    
    commands: {
        core_creds: {
            handler: command => {
                return prompts.update_creds();
            }
        },
        config: {
            handler: command => {
                return prompts.update_config();
            }
        },
    },
    handler: function(command) {
        var target = this.commands[command.split(/[ ]+/)[1]];
        return target && target.handler(command);
    }
    
}