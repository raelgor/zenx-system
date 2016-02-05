/* global log */
'use strict';

const util = require('util');

module.exports = {
    
    handler: command => {
        
        try {
            let output = eval(command.match(/^eval (.*)/)[1]);
            log.green(`Output:`);
            log.green(util.inspect(output, true));
        } catch(err) {
            log.error('eval failed: ', err);
        }
        
        return Promise.resolve();
        
    }
}