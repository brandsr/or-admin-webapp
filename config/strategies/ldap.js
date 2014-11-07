'use strict';

var passport = require('passport');
var LDAPStrategy = require('passport-ldapauth').Strategy;
var config = require('../config');
//
// Windows LDAP
var ldapConfig = {
  server: {
    url: config.ldap.LDAP_url,
    adminDn: config.ldap.LDAP_adminDn,
    adminPassword: config.ldap.LDAP_adminPassword,
    searchBase: config.ldap.LDAP_searchBase,
    searchFilter: '(sAMAccountName={{username}})',
    searchAttributes: [ 'title', 'sAMAccountName', 'displayName', 'mail', 'department','memberOf'],
    tlsOptions: {
      rejectUnauthorized: false
    },
  cache: false
  },
  usernameField: 'username',
  passwordField: 'password',
};

module.exports = function(){
  passport.use(new LDAPStrategy(
    ldapConfig
  ));
  passport.serializeUser(function(user,done){
    console.log('call from serializeUser form ldap: '+user);
    done(null, user );
  });
  passport.deserializeUser(function(user,done){
    console.log('call from deserializeUser form ldap: '+user);
    done(null,user);
  });
};
