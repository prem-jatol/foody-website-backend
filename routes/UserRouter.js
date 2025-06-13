const express = require('express');
const UserController = require('../controllers/UserController');
const verifyTokenMiddleware = require('../middelware/verifyToken');

const UserRouter = express.Router();

// UserRouter.get(
//     "/",
//     (req, res)=>{
//       const result = new UserController().signIn(req.body)
//         result.then().catch()
//     }
// )

UserRouter.post(
    "/register",
    (req, res)=>{
        const result = new UserController().singIn(req.body);
        result.then(
            (sucess)=>{
                res.send(sucess);
            }
        ).catch(
            (err)=>{
                res.send(err)
            }
        )
    }
)

UserRouter.post(
    "/login",
    (req, res)=>{
        const result = new UserController().login(req.body);
        result.then(
            (sucess)=>{
                res.send(sucess);
            }
        ).catch(
            (err)=>{
                res.send(err)
            }
        )
    }
)

UserRouter.post(
    "/profile/:id",
    verifyTokenMiddleware,
    (req, res)=>{
        const result = new UserController().profile(req.params.id);
        result.then(
            (sucess)=>{
                res.send(sucess);
            }
        ).catch(
            (err)=>{
                res.send(err)
            }
        )
    }
)

module.exports = UserRouter;