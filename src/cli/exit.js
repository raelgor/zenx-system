/* global log */
'use strict';

module.exports = {
    
    handler: command => {
        log.warn('Exiting...');
        process.exit(0);
    }
    
}