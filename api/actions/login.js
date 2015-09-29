export default function login(req) {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  return new Promise((resolve, reject) => {
    req.stormpath.app.authenticateAccount(user, function authenticateAccountCallback(err, result) {
      if (err) return reject(err.userMessage);

      req.session.user = result.account;
      req.session.user.name = result.account.username;

      resolve(req.session.user);
    });
  });
}
