'use strict';

function hook_stdout(callback) {
    
    var old_write = process.stdout.write;

    process.stdout.write = (write => {
        return function(string, encoding, fd) {
            write.apply(process.stdout, arguments)
            callback(string, encoding, fd)
        }
    })(process.stdout.write)

    return () => {
        process.stdout.write = old_write
    }
    
}

global.unhook = hook_stdout(str => {
    
    for(let socket of global.hookSockets)
        socket.send(str);   
    
});