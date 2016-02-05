/* global colors */
/* global dbc */
/* global config */
/* global log */
/* global co */
'use strict';

function load_client_list(){
    
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    co(function*(){
        
        log('Loading client list...');
        
        var clientQuery = yield new Promise(resolve=>dbc.collection('clients').find({}).toArray((...args) => resolve(args)));
        
        if(clientQuery[0]) {
            log.error('Failed to load client list from database.');
            return resolve(false);
        }
        
        config.clients = clientQuery[1];
        
        log.green(`Loaded ${ colors.magenta(config.clients.length) } clients.`);
        
        resolve(true);
        
    });
    
    return promise;

}

module.exports = load_client_list;