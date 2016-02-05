/* global dbc */
/* global config */
/* global log */
/* global co */
'use strict';

function load_configuration(){
    
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    co(function*(){
        
        log('Loading configuration...');
        
        if(!global.dbc) {
            log.error(`Can't load configuration without a database connection.`);
            return resolve(false);
        }
        
        var configQuery = yield new Promise(resolve=>dbc.collection('core').find({}).toArray((...args) => resolve(args)));
        
        if(configQuery[0]) {
            log.error('Failed to load configuration from database.');
            return resolve(false);
        }
        
        configQuery[1].forEach(pair => {
            log.magenta(`${pair.key}: ${pair.value}`);
            config[pair.key] = pair.value;
        });
        
        log.green('Configuration loaded.');
        resolve(true);
        
    });
    
    return promise;
        
}


        
module.exports = load_configuration;