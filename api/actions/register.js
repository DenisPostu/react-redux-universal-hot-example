export default function register(req) {
  const user = {
    givenName: req.body.username,
    surname: req.body.username,
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  return new Promise((resolve, reject) => {
    req.stormpath.app.createAccount(user, function createAccountCallback(err, account) {
      if (err) return reject(err.userMessage);

      account.name = account.username;

      resolve(account);
    });
  });
}
