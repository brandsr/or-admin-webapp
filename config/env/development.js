'use strict';

module.exports = {
	db: 'mongodb://db_1/oradmin-dev',
	app: {
		title: 'OR-ADMIN - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	ldap: {
		LDAP_url: process.env.LDAP_URL || 'ldaps://ldaps-ads-prod.cs.kadaster.nl:636',
		LDAP_adminDn: process.env.LDAP_ADMINDN || 'CN=plp-jboss-service,OU=JAP,OU=Service,OU=Gebruikers,DC=kadaster,DC=local',
		LDAP_adminPassword: process.env.LDAP_ADMINPW || 'Tefghd99',
                LDAP_searchBase: process.env.LDAP_BASE || 'ou=Gebruikers,DC=KADASTER,DC=LOCAL',
		callbackURL: 'http://localhost:3000/auth/ldap/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
