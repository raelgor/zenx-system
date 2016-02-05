/* global start_server */
/* global assert */
/* global load_client_list */
/* global load_scripts */
/* global load_core_creds */
/* global load_configuration */
/* global colors */
/* global config */
/* global dbc */
/* global prompts */
/* global connect_to_mongo */
/* global log */
/* global co */
'use strict';

function init(){
    
    co(function*(){
        
        log('Initializing system...');
        
        try { 
            
            assert.equal(yield load_scripts(), true); 
            assert.equal(yield load_core_creds(), true); 
            assert.equal(yield connect_to_mongo(), true); 
            assert.equal(yield load_configuration(), true); 
            assert.equal(yield load_client_list(), true);
            assert.equal(yield start_server(), true);
            
            log.green('System up and running. Peachy!');
            
        } catch (err) {
            log.warn('System halted.');
        }
        
    }).then(() => prompts.listen());
    
}

module.exports = init;