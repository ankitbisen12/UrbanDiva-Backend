const passport = require("passport");

exports.userData = (user) => {
  return {
    id: user.id,
    name: user.id,
    addresses: user.addresses,
    email: user.email,
    role: user.role,
  };
};

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizer = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }

  //TODO: this is temporary token for testing without cookie
  // token = 
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjc0NjIzNzYxNWVkZjg2ZTRlMWFkNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwODQ3Njk3fQ.PmfxUc_c618Cksb9riHhZHNs4qj76odVFb80yn5e7bAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjc0NjIzNzYxNWVkZjg2ZTRlMWFkNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEwODQ3Njk3fQ.PmfxUc_c618Cksb9riHhZHNs4qj76odVFb80yn5e7bA';
  return token;
};
