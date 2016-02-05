/* global colors */
/* global ws */
/* global config */
/* global http */
/* global co */
/* global fs */
/* global prompts */
/* global cli */
/* global log */
'use strict';

function start_server(){
    
    log('Starting server...');
        
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    co(function*(){
        
        if(global.server) {
            
            log('Server object found. Closing...');
            global.server.close();
            
            delete global.server;
            
        }
        
        yield wait(100);
        
        global.server = new ws.Server({ port: config.port, host: config.bind_ip });
        
        yield wait(100);
        
        log.green(`System is listening on ${colors.magenta(config.bind_ip + ':' + config.port)} ...`);
        resolve(true);
        
    });
    
    return promise;

}

module.exports = start_server;

function wait(ms) {
    return new Promise(r => setTimeout(r,ms));
}