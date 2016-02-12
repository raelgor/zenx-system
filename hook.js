'use strict';

const WebSocket = require('ws');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

var url = process.argv.join(' ').match(/(http[s]{0,1}\:\/\/)[a-zA-Z0-9\.\-]{1,255}(\:[0-9]{1,5}){0,1}/)[0];
var socket = new WebSocket(url);

socket.on('open', () => {
    
    socket.on('message', data => process.stdout.write(data));
    
    rl.setPrompt('>> ');
    rl.prompt();
    
    socket.send('hook');

    rl.on('line', (line) => {
        
        socket.send(line);
        
    });
    
});