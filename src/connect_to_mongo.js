/* global prompts */
/* global mongodb */
/* global make_mongo_url */
/* global config */
/* global fs */
/* global inquirer */
/* global log */
/* global co */
'use strict';

function connect_to_mongo() {
    
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    log('Trying to connect...');
    
    co(function*(){
        
        var conn = yield try_connect();
        
        if(!conn[0]) {
            log.green('Connected.');
            global.dbc = conn[1];
            resolve(true);
        }
        else {
            log.error('Failed to connect.');
            global.dbc = null;
            resolve(false);
        }
        
    });
    
    return promise;
    
}

function try_connect(){
    
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    var make_try = () => co(function*(){
        
        var mongo_url = make_mongo_url(config.core_credentials);
            
        var connection = yield new Promise(resolve => mongodb.connect(mongo_url, (...args) => resolve(args)));
        
        if(connection[0]) {
            
            log.error(`Connection error: ${connection[0].message}`);
            
            if(yield prompts.conf_update_creds()) {
                yield prompts.update_creds();
                return make_try();
            } else 
                resolve(connection);
            
        } else 
            resolve(connection);
        
    });
    
    make_try();

    return promise;
    
}

module.exports = connect_to_mongo;