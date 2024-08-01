const roles = {
  ADMIN: "admin",
  STAFF: "staff",
  STUDENT: "student",
};

const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).send("Erişim yetkisi yok");
    }

    next();
  };
};

module.exports = { authorize, roles };
