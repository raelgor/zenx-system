/* global co */
/* global fs */
/* global prompts */
/* global cli */
/* global log */
'use strict';

function load_scripts(){
    
    log('Loading scripts...');
        
    var resolve;
    var promise = new Promise(r => resolve = r);
    
    co(function*(){
        
        try {
            
            global.prompts = {};
            global.cli = {};
            
            let files = fs.readdirSync('./src/prompts');
            
            for(let file of files)
                prompts[file.replace(/\.js$/, '')] = require(`./prompts/${file}`);
                
            files = fs.readdirSync('./src/cli');
            
            for(let file of files)
                cli[file.replace(/\.js$/, '')] = require(`./cli/${file}`);
            
            log.green('Scripts loaded.');
            resolve(true);
            
        } catch (error) {
            log.error('Failed to load scripts.');
            resolve(false);
        }
        
    });
    
    return promise;

}

module.exports = load_scripts;