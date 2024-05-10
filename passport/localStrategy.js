const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'nick',
    passwordField: 'password',
    passReqToCallback: false,
  }, async (nick, password, done) => {
    try {
      const exUser = await User.findOne({ where: { nick } });
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //done의 첫번째 인수를 사용하는 경우는 서버쪽에러, 세번째 인수를 사용하는 경우 사용자에러
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
