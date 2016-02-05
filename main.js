/* global init */
/* global log */
'use strict';

// Libraries
global.load_configuration = require('./src/load_configuration');
global.connect_to_mongo = require('./src/connect_to_mongo');
global.load_client_list = require('./src/load_client_list');
global.load_core_creds = require('./src/load_core_creds');
global.make_mongo_url = require('./src/make_mongo_url');
global.load_scripts = require('./src/load_scripts');
global.start_server = require('./src/start_server');
global.inquirer = require('inquirer');
global.mongodb = require('mongodb');
global.init = require('./src/init');
global.assert = require('assert');
global.colors = require('colors');
global.log = require('./src/log');
global.path = require('path');
global.http = require('http');
global.co = require('co');
global.ws = require('ws');
global.fs = require('fs');

// Core database connection
global.dbc = null;

global.config = {};
   
for(let property of ['core_credentials', 'clients'])
    Object.defineProperty(global.config, property, 
        {enumerable:false,writable:true,value:null});

log('Starting...');

init();

//process.on('uncaughtException', error => 
//    log.error('System main process encountered an error: ', JSON.stringify(error)));