/* global connect_to_mongo */
/* global log */
'use strict';

module.exports = {
    
    handler: command => {
        log('Reconnecting...');
        global.dbc && global.dbc.close();
        return connect_to_mongo();
    }

}