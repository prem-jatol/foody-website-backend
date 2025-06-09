const express = require('express');
const UserController = require('../controllers/UserController');

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
                console.log(err);
            }
        )
    }
)

module.exports = UserRouter;