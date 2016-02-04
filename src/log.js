'use strict';

const colors = require('colors/safe');

var log = (...args) => {
    
    let stamp = `[${ colors.cyan('ZenX') }:${ colors.gray(process.pid) }:${ colors.gray(new Date().toISOString()) }]`;
    
    typeof args[0] === 'string' && (args[0] = colors.cyan(args[0]));
        
    console.log(stamp, ...args);
    
}

log.error = function(msg){ this(colors.red(msg)); }
log.warn = function(msg){ this(colors.yellow(msg)); }

module.exports = log;