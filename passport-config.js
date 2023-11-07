const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");

function initialize(connection, passport) {
  const authenticateUser = async (username, password, done) => {
    connection.query("select * from accounts where username = ?", username, async function(error, results, fields) {
      if (results.length > 0) {
        try {
          if (await bcrypt.compare(password, results[0].password)) {
            const user = {
              id: results[0].id,
              username: results[0].username,
            };
            return done(null, user)
          } else {
            return done(null);
            //   message: "Wrong password"
            // })
          }
        } catch (e) {
          return done(e);
        }
      } else {
        return done(null);
          // message: "User not found"
        };
    })
  }
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: "password"
  }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => connection.query("select * from accounts where id = ?", [id], function(err, results) {
    done(err, results[0]);
  }));

}

module.exports = initialize;
