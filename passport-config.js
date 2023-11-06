const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const mysql = require('mysql');


function initialize(connection, passport) {

  const user = {
    id: 1,
    username: 'admin',
    password: 'Pass'
  };

  connection.query('SELECT * FROM accounts WHERE id = 1', async function(error, results, fields) {
    console.log(results)
  })
  const authenticateUser = async (username, password, done) => {
    connection.query('SELECT * FROM accounts WHERE id = 1', async function(error, results, fields) {
      if (results.length > 0) {
        try {
          if (await bcrypt.compare(password, results[0].password)) {
            const user = {
              id: results[0].id,
              username: results[0].username,
              password: results[0].password
            };
            return done(null, user)
          } else {
            return done(null, user)
            //   message: "Wrong password"
            // })
          }
        } catch (e) {
          return done(e);
        }
      } else {
        return done(null, user)
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