import googleAppAuth from './googleOauth2';

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;

// Creates a Passport configuration for Google
class GooglePassport {
    userId: string;
    displayName: string;
    email: string;
    clientId: string;
    secretId: string;
     
    constructor() { 
        this.clientId = googleAppAuth.id;
        this.secretId = googleAppAuth.secret;

        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/auth/google/callback",
                profileFields: ['id', 'displayName', 'email']
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("email: " + profile.emails[0].value);

                    this.userId = profile.id;
                    this.displayName = profile.displayName;
                    this.email = profile.emails[0].value;
                    console.log("retrieve all of the profile info needed");
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
    }
}
export default GooglePassport;