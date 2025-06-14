const express = require("express");
const UserController = require("../controllers/UserController");
const verifyTokenMiddleware = require("../middelware/verifyTokenMiddleware");
const fileUpload = require("express-fileupload");

const UserRouter = express.Router();

// UserRouter.get(
//     "/",
//     (req, res)=>{
//       const result = new UserController().signIn(req.body)
//         result.then().catch()
//     }
// )

UserRouter.post("/register", (req, res) => {
  const result = new UserController().singIn(req.body);
  result
    .then((sucess) => {
      res.send(sucess);
    })
    .catch((err) => {
      res.send(err);
    });
});

UserRouter.post("/login", (req, res) => {
  const result = new UserController().login(req.body);
  result
    .then((success) => {
      res.cookie("token", success.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      });
      res.status(200).send(success);
    })
    .catch((err) => {
      res.send("login route", err.message);
    });
});

UserRouter.post("/profile", verifyTokenMiddleware, (req, res) => {
  const result = new UserController().getAllUsers();
  result
    .then((sucess) => {
      res.send(sucess);
    })
    .catch((err) => {
      res.send(err);
    });
});

UserRouter.post("/profile/:id", verifyTokenMiddleware, (req, res) => {
  const result = new UserController().profile(req.params.id);
  result
    .then((sucess) => {
      res.send(sucess);
    })
    .catch((err) => {
      res.send(err);
    });
});

UserRouter.post(
  "/profile-edit/:id",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    let image = null;
    if (req.files?.image) {
      image = req.files.image;
    }
    console.log("image", req.files.image);
    
    const result = new UserController().editUser(req.params.id, image);
    result
      .then((sucess) => {
        res.send(sucess);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

UserRouter.delete(
    '/user-delete/:id',
    (req, res)=>{
        const result = new UserController().deleteUser(req.params.id);
        
    }
)

module.exports = UserRouter;
