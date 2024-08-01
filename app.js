const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const bookRouter = require("./routes/BookRoutes");
const loginRouter = require("./routes/login");
app.use(express.json());

const SECRET_KEY = "very_secret";

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).send("Token gerekli");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send("Geçersiz token");
    req.user = decoded;
    next();
  });
};

app.post("/login", loginRouter);

app.use(authenticate);

app.use("/api", bookRouter);

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
