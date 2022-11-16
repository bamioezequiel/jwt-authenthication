import User from "./../models/authModel.js";
import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret Key", async (error, decodedToken) => {
      if (error) {
        res.json({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.json({ status: true, user: user.email });
        else res.json({ status: flase });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
