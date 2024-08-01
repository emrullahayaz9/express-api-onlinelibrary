exports.loginController = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } else if (username === "staff" && password === "password") {
    const token = jwt.sign({ username, role: "staff" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  } else if (username === "student" && password === "password") {
    const token = jwt.sign({ username, role: "student" }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token });
  }

  res.status(401).send("Geçersiz kullanıcı adı veya şifre");
};
