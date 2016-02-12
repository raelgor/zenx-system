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
        
        global.server.on('connection', socket => {
            
            global.sockets.push(socket);
            socket.on('message', cmd => {
                
                if(cmd === 'hook') {
                    socket.__hook = true;
                    global.hookSockets.push(socket);
                    return;
                }
                
                if(!socket.__hook)
                    return;
                
                console.log('\n');
                let input = {cmd};
                let target = input.cmd.match(/^([^ ]*)/)[1];
        
                global.___listening = false;
                
                target &&
                target in global.cli && 
                global.cli[target].handler(input.cmd);
                
            });
            
            socket.on('close', () => { 
                for(let key of ['sockets','hookSockets'])
                    global[key].splice(global.sockets.indexOf(socket),1);
            });
            
        });
        
        log.green(`System is listening on ${colors.magenta(config.bind_ip + ':' + config.port)} ...`);
        resolve(true);
        
    });
    
    return promise;

}

module.exports = start_server;

function wait(ms) {
    return new Promise(r => setTimeout(r,ms));
}