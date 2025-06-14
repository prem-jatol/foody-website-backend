const { verifyToken } = require("../helper");

function verifyTokenMiddleware(req, res, next) {
 const bearerHeader = req.headers["authorization"];
 console.log(bearerHeader);
 
  if (typeof bearerHeader !== "undefined") {
    
    const token = bearerHeader.split(" ")[1];
    const data = verifyToken(token);
    if (data) {
      next();
    } else {
      res.status(403).json({ message: "token invailid" });
    }
  } else {
    res.status(403).json({ message: "Token missing" });
  }
}

module.exports = verifyTokenMiddleware;
