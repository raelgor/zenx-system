/* global co */
/* global log */
/* global load_configuration */
/* global prompts */
'use strict';

function load_core_creds() {
    
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    log('Loading core credentials from file...');
    
    try {
        
        global.config.core_credentials = require('../config').core_credentials;
        log.green('Core credentials loaded.');
        
        resolve(true);
        
    } catch (error) {
        
        log.error(`No configuration file provided.`);
        log.error(`Please consult README.md or config.js.example and provide a 'config.js' or 'config.json' file with information about the core system database.`);
        
        co(function*(){
            
            if(yield prompts.conf_update_creds()) {
                
                yield prompts.update_creds();
                resolve(true);
                
            } else 
                resolve(false);
            
        });
        
    }
    
    return promise;
    
}


module.exports = load_core_creds;