/*
 * 
 * extrovert.io
 *
 * Copyright (c) 2014 Samuel Trangmar-Keates
 * Licensed under the MIT license.
 */

'use strict';

(function() {
    var FB = require('fb'),
        B  = require('bluebird')
    ;

    // B.promisifyAll(FB);

    function FBPostr(config) {
        this.name    = 'facebook';
        this.adapter = FB;
        FB.setAccessToken(config.accessToken);
    }


    FBPostr.prototype.post = function(message, next) {
        var adapter = this.adapter, p;

        return new B(function(resolve, reject) {
            adapter.api('me/feed', 'post', {
               message: message
            }, function(st) {
                if(st.error) {
                    return reject(st);
                }
                return resolve();
            });
        });
    };

    module.exports = FBPostr;
})();