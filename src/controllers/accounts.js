const { User } = require("../db.js");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { password, email } = req.body;
  const user = await User.findOne({ where: { email: email } });

  const userLogin =
    user !== null ? await bcrypt.compare(password, user.password) : false;

  if (!userLogin) {
    return res.json({
      type: "error",
      msj: "La contraseña o el correo no coinciden",
    });
  }
  res.status(200).json([user]);
}

async function register(req, res) {
  const { name, lastName, password, email, location } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ where: { email: email } });

  if (user !== null)
    return res.json({
      type: "error",
      msj: "Este email ya se encuentra registrado",
    });

  const newUser = await User.create({
    name,
    lastName,
    password: passwordHash,
    email,
    location,
  });
  res.status(200).json([newUser]);
}

module.exports = { login, register };
