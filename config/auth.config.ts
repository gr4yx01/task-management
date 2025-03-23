export default () => ({
  bcrypt: {
    salt: process.env.BCRYPT_SALT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_expiry: process.env.JWT_ACCESS_TOKEN_EXPIRY,
    refresh_expiry: process.env.REFRESH_TOKEN_EXPIRY
  }
});
